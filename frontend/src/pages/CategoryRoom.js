import React from 'react'
import bg from '../assets/img/page-titlebg.png'
import { useParams } from 'react-router-dom'
import RoomCard from '../components/RoomCard'

const CategoryRoom = () => {
    const params = useParams()
  return (
    <div>
        <section className="page-title-inner" data-bg-img={bg}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* page title inner */}
                        <div className="page-title-wrap">
                            <div className="page-title-heading"><h1 className="h2">{params?.category}<span>Offers</span></h1></div>
                            <ul className="list-unstyled mb-0">
                                <li><a href=" ">home</a></li>
                                <li className=" "><a href=" ">Rooms</a></li>
                                <li className="active"><a href=" ">{params?.category}</a></li>
                            </ul>
                        </div>
                        {/* End of page title inner */}
                    </div>
                </div>
            </div>
        </section>
        <RoomCard category={params?.category}/>
    </div>
  )
}

export default CategoryRoom
