import React,{useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";

const Logout = () => {
    const {state, dispatch} = useContext(UserContext);
    const navigation = useNavigate();
    useEffect(()=> {
       fetch('/logout', {
           method: "GET",
           headers: {
                Accept : "appllication/json",
               "Content-Type": "application/json"
           },
           credentials: "include"
       }).then((res)=> {
            dispatch({type:"USER", payload:false});
            navigation('/login', {replace: true});
            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
       }).catch((err)=> {
           console.log(err);
       });
    });

    return (
        <>
        <h1>Logout page</h1>
        </>
    )
}

export default Logout;