import React, { useState } from 'react'
import bg_img from "../assets/img/blog/sidebar-add.jpg"
import { useNavigate } from 'react-router-dom';
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Footer from 'components/Footer';
import Header from 'components/Header';

const SendEmail = () => {
    const location = useLocation();
    const { email } = location.state;

    const [data, setData] = useState({
        email: email || "",
        firstName: "",
        phone: "",
    });
    const navigate = useNavigate();


    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch(SummaryApi.send_email.url, {
            method: SummaryApi.send_email.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });



        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate("/");
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }

        console.log("data", dataApi);

    };
    return (
        <div>
            <Header />
            <section className="pt-100 pb-0">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5 col-lg-4">
                            <div className="getin-touch-image">
                                <img src={bg_img} alt="" />
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-8">
                            <div className="office-address-form">
                                <div className="office-address-head">
                                    <h3>INQUIRY NOW</h3>
                                    <p>Alteration literature to or an sympathize mr imprudence. Of is ferrars subject as enjoyed or tedious cottage. Procuring as in resembled by in agreeable. Next long no gave mr eyes. Admiration advantages no he celebrated so pianoforte as in resembled unreserved.</p>
                                </div>
                                <div className="address-form-inner contact-page-form parsley-validate">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="input-form-group">
                                                    <label>
                                                        <img src="assets/img/icons/account-icon.svg" className="svg" alt="" />
                                                    </label>
                                                    <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleOnChange} className="theme-input-style" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="input-form-group">
                                                    <label>
                                                        <img src="assets/img/icons/email-icon.svg" className="svg" alt="" />
                                                    </label>
                                                    <input type="text" name="firstName" placeholder="Name" value={data.firstName} onChange={handleOnChange} className="theme-input-style" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-form-group">
                                                    <label>
                                                        <img src="assets/img/icons/subject.svg" className="svg" alt="" />
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        placeholder="Phone"
                                                        value={data.phone}
                                                        onChange={handleOnChange}
                                                        maxLength="10"
                                                        onInput={(e) => {
                                                            if (e.target.value.length > 10) {
                                                                e.target.value = e.target.value.slice(0, 10);
                                                            } else if (e.target.value.length < 10) {
                                                                e.target.setCustomValidity("Phone number must be 10 characters.");
                                                            } else {
                                                                e.target.setCustomValidity("");
                                                            }
                                                        }}
                                                        className="theme-input-style"
                                                    />
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <button className="btn btn-fill-type mb-30">Send</button>
                                                <div className="form-response"></div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-0">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <div className="we-are-social">
                                <h3>We Are Social</h3>
                                <p>Alteration literature to or an sympathize mr<br /> imprudence is ferrars subject.</p>

                                <div className="footer-social-area">
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <a href="#"><i className="fa fa-facebook"></i></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fa fa-google-plus"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="insta-feed-inner">
                                <div className="insta-feed-carousel2 owl-carousel" data-owl-margin='9' data-owl-items="4" data-owl-responsive='{"0": {"items": "2"},"768": {"items": "3"},"1170": {"items": "4"}}' data-owl-speed="3000" data-owl-dots="false" data-owl-autoplay="false">
                                    <div className="single-carousel-inner">
                                        <a href="#">
                                            <img src="assets/img/social/insta1.jpg" alt="" />
                                            <div className="figurecaption">
                                                <span><i className="fa fa-comment"></i>24</span>
                                                <span><i className="fa fa-heart"></i>24</span>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Add other carousel items similarly */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SendEmail;
