import React, { useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import STATUS from "../common/status";
import AdminEditRoom from "../components/AdminEditRoom";
import displayLKRCurrency from "../helpers/displayCurrency";
import AdminDeleteRoom from "./AdminDeleteRoom";
const AdminRoomCard = ({ data, fetchdata }) => {
  const [editRoom, setEditRoom] = useState(false);
  const [deleteRoom, setDeleteRoom] = useState(false);
  return (
    <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
      <tbody>
        <tr className="woocommerce-cart-form__cart-item cart_item">
          <td>
            <div className="w-[200px] h-auto">
              {/* mx-auto object-fill h-[full] */}
              <img src={data.RoomImage} alt="package" />
            </div>
          </td>
          <td className="product-name w-80">
            <div className="text-ellipsis line-clamp-2 w-48 text-left">
              {data.Roomnumber}
            </div>
          </td>
          <td className="product-name w-5 text-left">
            <div className="">{data.category}</div>
          </td>
          <td className="product-name w-5 text-left">
            <div className="">{data.airconditioning}</div>
          </td>
          {/* <td className="product-name w-7 text-left">
            {displayLKRCurrency(data.price)}
          </td> */}
          <td className="product-name w-5 text-left">
            <div className="text-ellipsis line-clamp-2 w-48 text-left">{data.type}</div>
          </td>
          <td className="product-name w-5 text-left">
            <div
              className="text-3xl pl-5 hover:scale-110"
              title={
                data?.status === STATUS.Deactivate ? "Deactivated" : "Active"
              }
            >
              {data?.status === STATUS.Deactivate && (
                <div
                  className="text-red-500"
                  onClick={() => setEditRoom(true)}
                >
                  <GrStatusGood />
                </div>
              )}
              {data?.status !== STATUS.Deactivate && (
                <div
                  className="text-green-500"
                  onClick={() => setEditRoom(true)}
                >
                  <GrStatusGood />
                </div>
              )}
            </div>
            {/* <div className="text-3xl pl-5 hover:scale-110 text-sky-500" onClick={()=>setEditPackage(true)}>
                                <GrStatusGood/>
                    </div> */}
          </td>
          {editRoom && (
            <AdminEditRoom
              onClose={() => setEditRoom(false)}
              RoomData={data}
              fetchData={fetchdata}
            />
          )}
          <td className="pr-5"></td>
          <td>
            <div
              className="text-3xl  hover:text-red-700  hover:scale-110 cursor-pointer"
              title="delete"
              onClick={() => setDeleteRoom(true)}
            >
              <TiDelete />
            </div>
          </td>
          {deleteRoom && (
            <AdminDeleteRoom
              onClose={() => setDeleteRoom(false)}
              RoomData={data}
              fetchData={fetchdata}
            />
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default AdminRoomCard;
