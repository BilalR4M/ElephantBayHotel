import React from 'react'
import { useParams } from 'react-router-dom'
import PackageCard from '../components/PackageCard'
import Header from 'components/Header'
import Footer from 'components/Footer'

const CategoryPackage = () => {
    const params = useParams()
  return (
    <div>
        <Header/>
        <section className="page-title-inner">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* page title inner */}
                        <div className="page-title-wrap">
                            <div className="page-title-heading"><h1 className="h2">{params?.category}<span>Offers</span></h1></div>
                            <ul className="list-unstyled mb-0">
                                <li><a href=" ">Offers</a></li>
                                <li className=" "><a href=" ">Offers</a></li>
                                <li className="active"><a href=" ">{params?.category}</a></li>
                            </ul>
                        </div>
                        {/* End of page title inner */}
                    </div>
                </div>
            </div>
        </section>
        <PackageCard category={params?.category}/>
        <Footer/>
    </div>
  )
}

export default CategoryPackage
