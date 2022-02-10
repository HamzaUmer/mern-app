import React, {useEffect,useState} from "react";
import pic from "../assets/Hamza.jpeg";
import {useNavigate} from 'react-router-dom';

const About = () => {
    const navigation = useNavigate();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {

            const res = await fetch ('/about', {
                method: "GET",
                headers: {
                    Accept : "appllication/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
             console.log(err);
             navigation('/login');
        }
    }

    useEffect(() => {
         callAboutPage();
    }, []);

    return(
        <>
        <div className="container1 emp-profile">
            <form method="GET">
                <div className="row">
                    <div className="col-md-4 image-edit">
                        <img src={userData.name === "Mirza Hamza Umer" ? pic : "https://res.cloudinary.com/hmn/image/upload/v1635752808/download_qyvd7u.jpg"} alt="profile"/>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>{userData.name}</h5>
                            <h6>{userData.work}</h6>
                            <p className="profile-rating mt-3 mb-5">RANKINGS: <span> 1/10 </span></p>
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item nav-edit">
                                    <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab" aria-current="page" >About</a>
                                </li>
                                <li className="nav-item nav-edit">
                                    <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab">Timeline</a>
                                </li>
                                </ul>
                        </div>
                    </div>
                    <div className = "col-md-2">
                     <button type="submit" className="btn2 btn-success">Edit Profile</button>
                    </div>
                </div>

                <div className = "row">
                    <div className = "col-md-4">
                        <div className= "profile-work">
                            <p>WEBSITE LINKS:</p>
                            <a className="link-edit" href="https://www.linkedin.com/in/engr-mirza-hamza-umer-3b596617a/" target="_hamza">Linkedin</a><br/>
                            <a className="link-edit" href="https://github.com/HamzaUmer" target="_hamza">Github</a><br/>
                            <a className="link-edit" href="https://www.facebook.com/Mirza.Hamza.Umer" target="_hamza">Facebook</a><br/>
                            <a className="link-edit" href="https://www.instagram.com/mirhamzaumer786/" target="_hamza">Instagram</a><br/>
                            <a className="link-edit" href="https://my.indeed.com/p/mirzahamzau-tmdegt0" target="_hamza">Indeed</a><br/>
                        </div>
                    </div>
                    <div className = "col-md-8 pl-5 about-info">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className= "tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>User ID</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>{userData._id}</label>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label>Name</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>{userData.name}</label>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>{userData.email}</label>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label>Phone</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>{userData.phone}</label>
                                    </div>
                                </div>
                                <div className="row mt-2 mb-4">
                                    <div className="col-md-6">
                                        <label>Profession</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>{userData.work}</label>
                                    </div>
                                </div>
                            </div>
                            <div className= "tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Experience</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>Expert</label>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label>Hourly Rate</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>20$/hr</label>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label>Total Projects</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>50</label>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label>Enlish Level</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>Expert</label>
                                    </div>
                                </div>
                                <div className="row mt-2 mb-4">
                                    <div className="col-md-6">
                                        <label>Availability</label>
                                    </div>
                                    <div className="col-md-6 color-chng">
                                        <label>Online</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </>
    )
}

export default About;