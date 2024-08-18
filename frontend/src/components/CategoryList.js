import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(1).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.category_package.url);
            const dataResponse = await response.json();
            setCategoryProduct(dataResponse.data);
        } catch (error) {
            console.error('Error fetching category products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className="single-sidebar-widget widget_nav_menu mb-60">
            {/* widget title */}
            <div className="widget-title">
                <h4>Category</h4>
            </div>
            {/* End of widget title */}
            <ul>
                {loading ? (
                    categoryLoading.map(() => (
                        <p className=" text-slate-200 text-xl animate-pulse">Looding...</p>
                    ))
                ) : (
                    categoryProduct.map((product, index) => (
                        <li key={index}>
                            <Link to={"/package-category/" + product?.category} className='capitalize'>
                                {product?.category}
                                <span></span>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default CategoryList;
