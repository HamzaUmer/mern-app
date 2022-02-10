import React, {useContext, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import login from "../assets/signin.svg";
import { UserContext } from "../App";

const Login = () => {
    const {state, dispatch} = useContext(UserContext);
    const navigation = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/login' , {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();

        if (data.status === 400 || !data) {
            window.alert("Invalid Credentials");
            console.log("Invalid Credentials");
        }
        else {
            dispatch({type:"USER", payload:true});
            window.alert("Login Successfully!");
            console.log("Login Successfully");    
            
            navigation("/");
        }
    }
    return(
        <>
                <section className= "signup">
             <div className = "container mt-5">
                 <div className="signin-content">
                 <div className="signin-image">
                             <figure>
                                 <img src= {login} alt= "login"/>
                         </figure>
                         <NavLink to="/registration" className="signin-image-link">Create an account</NavLink>
                         </div>
                     <div className= "signin-form">
                         <h2 className="form-title1">Login</h2>
                         <form method="POST" className="register-form1" id="register-form1">
                             <div className="form-group">
                                 <label htmlFor="email">
                                 <i class="zmdi zmdi-email material-icons-name"></i>
                                 </label>
                                 <input type="email" name="email" id="email" autoComplete= "off" 
                                 value = {email}
                                 onChange= {(e) => setEmail(e.target.value)}
                                 placeholder="Your Email"/>
                             </div>
                             <div className="form-group">
                                 <label htmlFor="password">
                                 <i class="zmdi zmdi-lock material-icons-name"></i>
                                 </label>
                                 <input type="password" name="password" id="password" autoComplete= "off" 
                                 value = {password}
                                 onChange= {(e) => setPassword(e.target.value)}
                                 placeholder="Your Password"/>
                             </div>
                             <div className = "form-button">
                             <button type="button" name= "login" id = "login" className="btns btn-success"
                             value= "Log in"
                             onClick= {loginUser}
                             >Login</button>
                             </div>
                         </form>
                         </div>  
                   
                </div>
             </div>
          </section>
        </>
    )
}

export default Login;