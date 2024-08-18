import React, { useState } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/font-awesome.min.css";
import "../assets/plugins/owl-carousel/owl.carousel.min.css";
import "../assets/plugins/Magnific-Popup/magnific-popup.css";
import "../assets/plugins/animate-css/animate.min.css";
import "../assets/plugins/swiper/swiper.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../assets/css/custom.css";
import "../assets/css/Navbar.css";
import logo2 from '../assets/img/logo2.png';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you can perform any necessary validation or processing of the email
  
      // Navigate to the "/send-email" route and pass the email as state
      navigate("/send-email", { state: { email } });
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
    return (

        <footer className="footer-type4 z-40">
            <div className="footer-top">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* footer widget */}
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <Link to="/">
                                    <img src={logo2} data-rjs="2" alt="Logo" />
                                </Link>
                            </div>
                            <div className="footer-about-text">
                                <p>Be the first to know New developments at the Hotel ElephantBay!</p>
                            </div>
                            <div className="footer-subscribe parsley-validate">

                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        className="theme-input-style"
                                        placeholder="your email here"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                    <button type="submit">
                                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                                    </button>
                                </form>

                            </div>
                        </div>
                        {/* End of footer widget */}

                        {/* footer widget */}
                        <div className="footer-widget">
                            <div className="footer-header">
                                <h5>About Elephantbay</h5>
                            </div>
                            <div className="footer-links">
                                <ul className="links-list">
                                    <li><Link to=" ">About Our Hotel</Link></li>
                                    <li><Link to=" ">License</Link></li>
                                    <li><Link to=" ">Policy Privacy</Link></li>
                                    <li><Link to=" ">Terms of use</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* End of footer widget */}

                        {/* footer widget */}
                        <div className="footer-widget">
                            <div className="footer-header">
                                <h5>Useful Links</h5>
                            </div>
                            <div className="footer-links">
                                <ul className="links-list">
                                    <li><Link to="/rooms">Rooms</Link></li>
                                    <li><Link to="/offers">Offers</Link></li>
                                    <li><Link to="/events">Events</Link></li>
                                    <li><Link to="/location">Location</Link></li>
                                </ul>
                            </div>
                        </div>
                        {/* End of footer widget */}

                        {/* footer widget */}
                        <div className="footer-widget">
                            <div className="footer-header">
                                <h5>Contact Us</h5>
                            </div>
                            <div className="footer-contact-wrap">
                                <ul className="footer-contact-list">
                                    <li>
                                        <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                                        Pinnawala,, Pinnawala, 71100
                                    </li>
                                    <li>
                                        <span><i className="fa fa-envelope" aria-hidden="true"></i></span>
                                        <a href="mailto:info@emailname.com">Email: hotelelephantbay@gmail.com</a>
                                    </li>
                                    <li>
                                        <span><i className="fa fa-phone" aria-hidden="true"></i></span>
                                        <a href="tel:+006543219874">Phone: +94 352 266 731</a>
                                    </li>
                                    <li>
                                        <span><i className="fa fa-clock-o" aria-hidden="true"></i></span>
                                        <div className='font-bold'>Monday - Saturday:</div>9:00 am - 18:00 pm
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-social-area ">
                                <ul className="list-unstyled">
                                    <li><a href=" "><i className="fa fa-facebook"></i></a></li>
                                    <li><a href=" "><i className="fa fa-twitter"></i></a></li>
                                    <li><a href=" "><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        {/* End of footer widget */}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="footer-bottom-wrap">
                                <div className="copyright-text">
                                    <p>© 2024 <Link to={'/'}>ElephantBay</Link> All rights reserved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>


    );
};

export default Footer;
