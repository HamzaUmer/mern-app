import React,{useState,useEffect} from "react";

const Home = () => {
    const [userName, setUserName] = useState("");
    const [show, setShow] = useState(false);

    const homePage = async () => {
        try {

            const res = await fetch ('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserName(data.name);
            setShow(true);

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
             console.log(err);
        }
    }

    useEffect(() => {
         homePage();
    }, []);
    return(
        <>
        <div className="home-page">
            <div className="home-div">
            <p className= "pt-5">WELCOME</p>
            <h1>{userName}</h1>
            <h2> { show ? "Happy to see You Back" : <h2 className="mern">We are the <span className="M">M</span>E<span className="R">R</span><span className="N">N</span> Developer</h2>}</h2>
            </div>
        </div>
        </>
    )
}

export default Home;