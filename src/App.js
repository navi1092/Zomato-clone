import HomePage from "./component/home/HomePage";
import SearchPage from"./component/search/SearchPage";
import RestaurantPage from "./component/restaurant/RestaurantPage";
import {Routes,Route} from 'react-router-dom';


function App() {
  return (
    <>
    <main className="container-fluid">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="searchPage/:meal_id" element={<SearchPage/>}/>
        <Route path="/restaurant/:id" element={<RestaurantPage/>}/>
      </Routes>
    </main>
    </>
  );
}

export default App;
