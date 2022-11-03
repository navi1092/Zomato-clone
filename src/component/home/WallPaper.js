import axios from 'axios';
import { useEffect, useState} from "react";
// import { useParams } from 'react-router-dom';
import Headers from '../Header';


function WallPaper(){

    let [ locationList, setLocationList]= useState([]);
   

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

    }
    let [ RestByLocationId,setRestByLocationId]= useState([]);
    let [setsearchoutput,setdisabled]=useState([]);

    let getRestByLocationId =async (event)=>{
        let value = event.target.value;
     
        let URL="http://localhost:5002/api/get-restaurant-location-id/"+value;
        if(value !==""){
            try{
                let {data} = await axios.get(URL);
                console.log(data);
                if(data.status === true){
                       if(data.output.length !==0){
                        setdisabled(false);
                        setRestByLocationId(data.output);
                        setsearchoutput(data.output);
                       
                    
                       } else {
                        setdisabled(true);
                        setRestByLocationId([]);
                        setsearchoutput([]);
                       }
                    }
              }catch (error){
               console.log(error);
               alert("server error");
              }
        
            }
     
    }
 
    
    useEffect(()=>{
        getLocationList();
        getRestByLocationId();
       
    },[]);

    return (
    <>     
          
           <section className="row main_page align-content-start">
           <div className="col-12">
            <Headers/>
            </div>
            <section className="col-12 d-flex flex-column align-items-center justify-content-center">
                <p className="logo h1 fw-bold m-3 mb-0">z!</p>
                <p className="h1 fw-bold text-white m-3 text-center">Find the best restaurants, cafés, and bars</p>


                <div className="search_items d-flex w-50 p-3">
                    <div className="location_rest w-50">
                    <select className="form-select mb-3 mb-lg-0 w-60 px-3 py-2 me-lg-1">
                        <option value=" " onChange={(e)=>getRestByLocationId(e)} >Please type a location</option>
                        {locationList.map((location,index) =>{
                            return (
                                <option value="" key={index}>
                                    {location.name},{location.city}
                                </option>
                            )
                        })}
                    </select>
                    </div>
                  <div className="rest_search w-75 ">
                    <div className="location  input-group ms-2">
                        <span className=" search_icon input-group-text bg-white ">
                            <i className="fa fa-search d-lg-inline  d-sm-none"></i>
                        </span>
                      <select className="form-control mb-2 mb-lg-0 me-lg-1 px-3 py-2">
                        <option value=" ">Search a restaurant</option>
                        {
                          RestByLocationId.map((location,index)=>{
                            return (
                                <option value="" key={index}>
                                    {location.name},{location.city}
                                </option>
                            )
                          })
                        }
                        
                      
                      </select>
                      
                       
                    </div>
                </div>  
                </div>

            </section>

        </section>
    </>
        
    );
}
    
export default WallPaper;