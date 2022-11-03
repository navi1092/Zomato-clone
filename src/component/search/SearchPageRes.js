import axios from "axios";
import { useEffect, useState } from "react";
import {useParams,useNavigate } from "react-router-dom";


function SearchPageRes(){
    let params = useParams();
    let navigate = useNavigate();
    let {meal_id} = params;
    let [restaurantList, setRestaurantList] = useState([]);
    let [ locationList, setLocationList]= useState([]);
    let[filter,setFilter] = useState({mealtype : meal_id});

    let getLocationList =async ()=>{
       try{
         let response = await axios.get("http://localhost:5002/api/get-locations");
         let data = response.data;
         if(data.status === true){
            setLocationList([...data.result]);
         }else {
            setLocationList([]);
         }
       }catch (error){
        console.log(error);
        alert("server error");
       }

    };

    let filterOperation = async (filter) => {
        let URL = "http://localhost:5002/api/filterData";
         try {
          let { data } = await axios.post(URL, filter);
      
          if (data.status === true) {
            setRestaurantList([...data.newResult]);
          }
        } catch (error) {
          alert("server error");
    
        }
      };
    
    let makeFiltration =( event, type)=>{
        let value = event.target.value;
        let _filter ={...filter};

        switch(type) {
           case "location":
            if(Number(value)>0){
              _filter["location"] = Number(value);
            } else{
              delete _filter["location"];
            }
            break;
           case "sort":
            _filter["sort"] = Number(value);
            break;  
           case "cost-for-two":
            let CostForTwo = value.split("-");
            _filter["lcost"] = Number(CostForTwo[0]);
            _filter["hcost"] = Number(CostForTwo[1]);
            break;
           case "cuisine" :
            if(Number(value)>0){
              _filter["cuisine"] = Number(value);
            }else{
              delete _filter["cuisine"];
            }
            break;
        }
        setFilter({..._filter});
        filterOperation(_filter);

    }; 
     let handlePageClick =()=>{
        
     }
      
      useEffect(() => {
        let filter ={
          mealtype:meal_id,
        }
        filterOperation(filter);
        getLocationList();
       
      }, []);
      
    return (
        <>
        <div className="row">
        <div className="col-12 px-5 pt-4">
        <p className="h3">Breakfast Places in Mumbai</p>
       </div>
  
       <div className="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
        <div className="col-12 col-lg-3 col-md-4 food-shadow p-3 my-3 ms-3">
          <div className="d-flex justify-content-between">
          <p className="fw-bold h6">Filters</p>
          <button
                className="d-lg-none d-md-none btn"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFilter"
                aria-controls="collapseFilter"
              >
                <span className="fa fa-eye"></span>
              </button>
         </div>
         <div className="collapse show" id="collapseFilter"> 
         <div>
        <label htmlFor="" className="form-label">Select Location</label>
         <div className="dropdown">
        
            <select className="form-select form-select-sm"
              onChange={(event)=>makeFiltration(event,"location")}>
              <option value="-1">-- Select location --</option>
              {locationList.map((location,index) =>{
                  return (
                     <option value={location.location_id} key={index}>
                         {location.name}, {location.city}
                     </option>
                            )
                        })}
            </select>
          </div>
         </div>
          <p className="mt-4 mb-3 fw-bold">Cuisine</p>
          <div>
            <div className="ms-1">
              <input type="checkbox" 
              className="form-check-input" 
              name="cuisine" 
              value="1"
              onChange={(event)=>makeFiltration(event,"cuisine")}/>
              <label htmlFor="" className="form-check-label">North Indian</label>
            </div>
            <div className="ms-1">
              <input type="checkbox" 
              className="form-check-input" 
              name="cuisine" 
              value="2"
              onChange={(event)=>makeFiltration(event,"cuisine")}/>
              <label htmlFor="" className="form-check-label">South Indian</label>
            </div>
            <div className="ms-1">
              <input type="checkbox" 
              className="form-check-input" 
              name="cuisine" 
              value="3"
              onChange={(event)=>makeFiltration(event,"cuisine")}/>
              <label htmlFor="" className="form-check-label">Chinese</label>
            </div>
            <div className="ms-1">
              <input type="checkbox" 
              className="form-check-input" 
              name="cuisine" 
              value="4" 
              onChange={(event)=>makeFiltration(event,"cuisine")}/>
              <label htmlFor="" className="form-check-label">Fast Food</label>
            </div>
            <div className="ms-1">
              <input type="checkbox" 
              className="form-check-input" 
              name="cuisine" 
              value="5"
              onChange={(event)=>makeFiltration(event,"cuisine")}/>
              <label htmlFor="" className="form-check-label">Street Food</label>
            </div>
          </div>
          <p className="mt-4 mb-3 fw-bold">Cost for Two</p>
          <div>
            <div className="ms-1">
              <input type="radio" 
              className="form-check-input" 
              name="cost-for-two"
              value="0-500"
              onChange={(event)=>makeFiltration(event,"cost-for-two")}/>
              <label htmlFor="" className="form-check-label">Less than 500</label>
            </div>
            <div className="ms-1">
              <input type="radio" 
              className="form-check-input" 
              name="cost-for-two"
              value="500-1000"
              onChange={(event)=>makeFiltration(event,"cost-for-two")}/>
              <label htmlFor="" className="form-check-label">500 to 1000</label>
            </div>
            <div className="ms-1">
              <input type="radio" 
              className="form-check-input" 
              name="cost-for-two"
              value="1000-1500"
              onChange={(event)=>makeFiltration(event,"cost-for-two")}/>
              <label htmlFor="" className="form-check-label">1000 to 1500</label>
            </div>
            <div className="ms-1">
              <input type="radio" 
              className="form-check-input" 
              name="cost-for-two"
              value="1500-2000"
              onChange={(event)=>makeFiltration(event,"cost-for-two")}/>
              <label htmlFor="" className="form-check-label">1500 to 2000</label>
            </div>
            <div className="ms-1">
              <input type="radio" 
              className="form-check-input" 
              name="cost-for-two"
              value="2000-999999"
              onChange={(event)=>makeFiltration(event,"cost-for-two")}/>
              <label htmlFor="" className="form-check-label">2000+</label>
            </div>
          </div>
          <p className="mt-4 mb-3 fw-bold">Sort</p>
          <div>
            <div className="ms-1 form-check">
              <input type="radio" className="form-check-input" 
              name="sort" 
              value="1" 
              onChange={(event)=>makeFiltration(event,"sort")}/>
              <label htmlFor="" className="form-check-label">Price Low to High</label>
            </div>
            <div className="ms-1 form-check">
              <input type="radio" className="form-check-input" 
              name="sort" 
              value="-1"
              onChange={(event)=>makeFiltration(event,"sort")}/>
              <label htmlFor="" className="form-check-label">Price High to Low</label>
            </div>
         </div>
        
        </div>
         </div>
          {/* searchPage */}
         <div className="col-12 col-lg-8 col-md-7 ">
             { restaurantList.map((restaurant,index)=>{
               return(
                <div className=" col-12 food-shadow mt-3 ms-5 mb-4 me-3 px-lg-5 px-md-5 pt-4 " 
                key={index} 
                onClick={()=>navigate('/restaurant/'+restaurant._id)}>
                <div className="d-flex">
                  <img src={"/images/" + restaurant.image} className="food-item" alt="breakfast"/>
                  <div className="ms-5">
                    <p className="h4 fw-bold">{restaurant.name}</p>
                    <p className="fw-bold text-muted">{restaurant.city}</p>
                    <p className="m-0 text-muted">
                        <i className="fa fa-map-marker fa-2x text-warning"></i>
                         {restaurant.locality}, {restaurant.city}</p>
                  </div>
                </div>
                <hr/>
                <div className="d-flex">
                  <div>
                    <p className="m-0">CUISINES</p>
                    <p className="m-0">COST FOR TWO</p>
                  </div>
                  <div className="ms-5">
                    <p className=" m-0 fw-bold">: 
                    {
                      restaurant.cuisine.reduce((pValue,cValue)=>{
                        return pValue.name +", "+cValue.name;
                      })
                    }</p>
                    <p className="fw-bold">
                      : <i className="fa fa-inr" aria-hidden="true"></i>{restaurant.min_price}
                    </p>
      
                  </div>
      
                </div>
              </div> 
               );

             })}
                    
                
         <div className="m-5 center" >
          <nav>
            <ul className="pagination justify-content-center" onClick={handlePageClick()}>
              <li className="page-item"><a className="page-link" href="#">&lt;</a></li>
              <li className="page-item active" aria-current="page">
                <span className="page-link">1</span>
              </li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">4</a></li>
              <li className="page-item"><a className="page-link" href="#">5</a></li>
              <li className="page-item"><a className="page-link" href="#">&gt;</a></li>
            </ul>
          </nav>
        </div>
         </div>  
        </div>
         </div>
       </>
    );
    }
export default SearchPageRes;
// let { mealtype,location, cuisine, hcost, lcost,sort, page }
