import React,{useEffect,useState} from "react";
import phone from "../assets/phone.png";
import email from "../assets/email.png";
import address from "../assets/address.png";

const Contact = () => {
    const [userData, setUserData] = useState({name: "", email:"", phone:"", message: ""});

    const contactSend = async () => {
        try {

            const res = await fetch ('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, phone: data.phone});

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
             console.log(err);
        }
    }

    useEffect(() => {
         contactSend();
    }, []);
    //storing data in state
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value});
    }
    //Send data to backend
    const sendData = async (e) => {
        e.preventDefault();

        const {name, email, phone, message}= userData;

        const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name,
               email, 
               phone,
               message
            })
        });

        const data = await res.json();

        if(!data) {
            console.log("message not send");
            alert("Message not Send!!");
        }
        else {
            alert("Message Send!!");
            setUserData({...userData, message:""});
        }
    }

    return(
        <>
        <div className= "contact_info">
            <div className ="container-fluid">
                <div className ="row">
                    <div className="col-lg-10 offset-lg-1 box-edit">
                        <div className="contact_info_item d-flex justify-content-start align-items-center">
                            <img src= {phone} alt="phone"/>
                            <div className= "contact_info_content">
                                <div className="contact_info_title">
                                    Phone
                                </div>
                                <div className="contact_info_text">
                                    +92 321 2399010
                                </div>
                            </div>
                        </div>
                        <div className="contact_info_item d-flex justify-content-start align-items-center">
                            <img src= {email} alt="phone"/>
                            <div className= "contact_info_content">
                                <div className="contact_info_title">
                                    Email
                                </div>
                                <div className="contact_info_text">
                                    bunny@gmail.com
                                </div>
                            </div>
                        </div>
                        <div className="contact_info_item d-flex justify-content-start align-items-center">
                            <img src= {address} alt="phone"/>
                            <div className= "contact_info_content">
                                <div className="contact_info_title">
                                    Address
                                </div>
                                <div className="contact_info_text">
                                    Karachi, Pakistan
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        { /* Contact Us form */}
        <div className= "contact_form">
            <div className="container3">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="contact_form_container py-5">
                            <div className="contact_form_title">
                                Get in Touch
                            </div>
                            <form id="contact_form">
                                <div className="contact_form_name box-edit1">
                                    <input type="text" id="contact_form_name" className="contact_form_name input_field"
                                    name="name"
                                    value={userData.name}
                                    onChange= {handleInputs}
                                    placeholder="Your Name" required="true"/>
                                    <input type="email" id="contact_form_email" className="contact_form_email input_field"
                                    name="email"
                                    value={userData.email}
                                    onChange= {handleInputs}
                                    placeholder="Your Email" required="true"/>
                                    <input type="number" id="contact_form_phone" className="contact_form_phone input_field"
                                    name="phone"
                                    value={userData.phone}
                                    onChange= {handleInputs}
                                    placeholder="Your Number" required="true"/>
                                </div>
                                <div className="contact_form_text mt-5">
                                    <textarea className="text_field contact_form_message" placeholder="Message"
                                    name="message"
                                    value={userData.message}
                                    onChange= {handleInputs}
                                    cols="30" rows="10"></textarea>
                                </div>
                                <div className = "form-button">
                             <button type="button" className="btn1 btn-success" onClick={sendData}>Send Message</button>
                             </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Contact;