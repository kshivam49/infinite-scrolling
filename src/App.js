import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import InfiniteScroll from './components/InfiniteScroll';
import ItemDetailsPage from "./components/ItemDetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfiniteScroll />}/>
        <Route path="/item-details/:id" element={<ItemDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
