import React, { useEffect, useState } from 'react';
import { fetchItems } from '../Api';
import './InfiniteScroll.css'
import { useNavigate} from 'react-router-dom';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loadMoreItems = async () => {

    if (loading) return;
  
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    try {
      const nextPage = page + 1; // Calculate the next page
      const newItems = await fetchItems(nextPage, 10); // Fetch the next batch of 10 items
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage(nextPage); // Update the page directly
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Use useEffect to load more items when the 'page' state changes
  useEffect(() => {
    loadMoreItems();
  }, [page]);

  const handleItemClick = (item) => {
        navigate(`/item-details/${item.id}`);
  };
  
  // Function to handle scroll events for infinite scrolling
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const contentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= contentHeight - 200) {
      // Adjust the 200 to control when the next batch of items should load
      loadMoreItems();
    }
  };

  // Use useEffect to add and remove the scroll event listener
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  return (
    <div className="infinite-scroll-container">
      {items.map((item) => (
        <div key={item.id} className="item" onClick={() => handleItemClick(item)}>
          <img src={item.image} alt={item.name} />
          <h2>{item.name}</h2>
          <p>$ {item.current_price}</p>
        </div>
      ))}
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      {error && <div className="error-message">Error: {error.message}</div>}
    </div>
  );
};

export default InfiniteScroll;
