import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Swal from "sweetalert2";

function Header() {
  let navigate = useNavigate();

  let getTokenDetails =()=>{
    // read the data from localStorage
    let token = localStorage.getItem("auth-token");
    if(token == null){
      return false;
    }else{
      return jwt_decode(token);
    }
  };

  let [userLogin, setUserLogin] = useState(getTokenDetails());

  let onSuccess =(credentialResponse)=>{
     let token = credentialResponse.credential;
      // save the data
    localStorage.setItem("auth-token", token);
    Swal.fire({
      icon: "success",
      title: "Login Successfully",
      text: "",
    }).then(() => {
      window.location.reload();
    });
  };

  let onError =()=>{
    Swal.fire({
      icon: "error",
      title: "Opps...",
      text: "Login Fail Try Again",
    });
  };
  console.log(userLogin);
  let logout = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout me!",
    }).then((result) => {
      if (result.isConfirmed) {
        // remove data from localStorage
        // removeItem
        localStorage.removeItem("auth-token");
        window.location.reload();
      }
    });
  };
  return (
    <>
      <GoogleOAuthProvider clientId="956171161479-itb898c6q9jq4svc4dm6fj3lj73d8ppi.apps.googleusercontent.com">
        <div className="modal fade" 
            id="google-sign-in" 
            tabIndex="-1" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Google Sign-In</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <GoogleLogin
                  onSuccess={onSuccess}
                  onError={(onError)} />;
              </div>
            </div>
          </div>
        </div>
        <div className="row  justify-content-center" style={{background: window.location.pathname == "/" ? " " : "red"}}>
          <div className="col-10 d-flex justify-content-between py-2">
            <p className="m-0 brand hand" onClick={() => navigate("/")}>Z!</p>
            
            {userLogin ? (
              <div>
                <span className="fs-5 text-white fw-bold me-3">
                  Welcome, {userLogin.given_name}
                </span>
                <button className="btn btn-outline-light" onClick={logout}>
                  <i className="fa fa-exit" aria-hidden="true"></i>Logout
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="btn text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#google-sign-in"
                >
                  Login
                </button>
                <button className="btn btn-outline-light">
                  <i className="fa fa-search" aria-hidden="true"></i>Create a
                  Account
                </button>
              </div>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default Header;
