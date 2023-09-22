import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams to get the 'id' parameter
import './ItemDetailsPage.css'; 

const ItemDetailsPage = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cryptocurrency details based on the 'id' parameter
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItemDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!itemDetails) {
    return <div>Item not found.</div>;
  }

  return (
    <div className="item-details-container">
      <h2>{itemDetails.name}</h2>
      <img src={itemDetails.image.large} alt={itemDetails.name} />
      <h3>$ {itemDetails.market_data.current_price.usd}</h3>
      <p> {itemDetails.description.en}</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default ItemDetailsPage;
