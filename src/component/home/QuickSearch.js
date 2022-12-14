import axios from "axios";
import {useEffect,useState} from "react";
import {useNavigate } from "react-router-dom";

function QuickSearch(){
     let navigate =useNavigate(); //creating instance of useNavigate

    let [mealTypeList,setMealTypeList] = useState([]);

    let getMealTypes= async ()=>{
        try{
       let response = await axios.get("http://localhost:5002/api/get-mealtypes");

       let data = response.data;
       if(data.status === true){
        setMealTypeList([...data.result]);
       }else{
        setMealTypeList([]);
       }
    }catch (error) {
       alert("server side error");
    }
    };

   let getQuickSearchPage = (id)=>{
     navigate(`/searchPage/${id}`);
   }
    useEffect(()=>{
        getMealTypes();
    },[]);

    //console.log(mealTypeList);
    return (

    <>
    <section className="row justify-content-center">
            <section className="col-10 mt-lg-4">
                <h3 className=" fw-bold text_navy">Quick Searches</h3>
                <p className="text-secondary">Discover restaurants by type of meal</p>
            </section>
            <section className="col-10">
                <section className="row py-2">
                    <section className="col-12 px-0 d-flex justify-content-evenly flex-wrap">
                        {
                            mealTypeList.map((mealType,index)=>{
                                return(
                        <section key={index} className="menu-item px-0 d-flex border border-1" 
                            onClick={()=> getQuickSearchPage(mealType.meal_type)}>
                            
                            <img src={"/images/" +mealType.image} 
                            alt="" className="image-item" />
                            
                            <div className="pt-3 px-2">
                                <h4 className="text_navy">{mealType.name}</h4>
                                <p className="small text-secondary">{mealType.content}</p>
                            </div>
                        </section>
                        )}
                        )}
                    </section>
                </section>
            </section>
        </section>
    </>

    );

}
export default QuickSearch;