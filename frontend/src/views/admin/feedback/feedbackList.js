import React, { useEffect, useState } from 'react';
import summaryApi from '../../../common';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { MdCancel } from 'react-icons/md';
import Feeedbackdeleteform from './feedbackdeleteform';
import { IoMdCloudDownload } from "react-icons/io";

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchDate, setSearchDate] = useState('');
    const [deletefeedback, setDeleteFeedback] = useState(null);

    const fetchFeedbacks = async () => {
        try {
            const fetchData = await fetch(summaryApi.get_feedback.url, {
                method: summaryApi.get_feedback.method,
                credentials: 'include'
            });
            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setFeedbacks(dataResponse.data);
            }
            if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleSearchDateChange = (e) => {
        setSearchDate(e.target.value);
    };

    const filteredFeedbacks = searchDate
        ? feedbacks.filter(feedback => new Date(feedback.date).toISOString().split('T')[0] === searchDate)
        : feedbacks;

    const generateStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={i} className="star text-yellow-500">★</span>);
        }
        return stars;
    };



    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Page Visits</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <div className="search-container">
                                    <label htmlFor="search-date">Search by Date:</label>
                                    <input
                                        type="date"
                                        id="search-date"
                                        value={searchDate}
                                        onChange={handleSearchDateChange}
                                    />
                                </div>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <Link to={"/feedback-pdf"}>
                                    <button
                                        className="border-2 py-2 px-3 text-sm bg-black text-white  dark:text-white"
                                    >
                                        <div className="flex justify-between items-center text-right gap-2">
                                            <div className="text-lg">
                                                <IoMdCloudDownload />
                                            </div>
                                            Dounload PDF
                                        </div>
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Name
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Date
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Suggestions
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Rating
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredFeedbacks.length === 0 ? (
                                    <tr>
                                        <td colSpan="5">No feedbacks found for the selected date.</td>
                                    </tr>
                                ) : (
                                    filteredFeedbacks.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                    {data?.name}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {moment(data?.createdAt).format('LL')}
                                                </td>
                                                <td className="flex-initial text-left px-4 py-2 m-2 break-words">
                                                    {data?.suggestions}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {generateStars(data?.rating)}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div
                                                        className="text-3xl text-red-500  hover:text-red-700  hover:scale-110 cursor-pointer"
                                                        title="delete"
                                                        onClick={() => setDeleteFeedback(data)}
                                                    >
                                                        <MdCancel />
                                                    </div>
                                                </td>
                                                {deletefeedback && (
                                                    <Feeedbackdeleteform
                                                        onClose={() => setDeleteFeedback(null)}
                                                        packageData={deletefeedback}
                                                        fetchData={fetchFeedbacks}
                                                    />
                                                )}
                                            </tr>
                                        );
                                    })

                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedbackList;
