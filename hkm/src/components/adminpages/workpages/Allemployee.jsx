// import "./workpages.css";
// import axios from "axios";
// import { getEmployee } from "../../../slices/adminSlice";
// import { getEmployeeData } from "../../../stateApis/stateapi";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { MdDeleteForever } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Allemployee = () => {
//   const isAdminLogin = useSelector((state) => state.admin.logindetails.isLogin);
//   const navigate = useNavigate();

//   //This is the code to update the react state instanly when the component renders;
//   const dispatch = useDispatch();
//   const empdt = useSelector((state) => state.admin.employees);

//   const updateEmpData = async (data) => {
//     dispatch(getEmployee(data));
//   };
//   useEffect(() => {
//     getEmployeeData(updateEmpData);
//   }, []);

//   const allEmployees = useSelector((state) => state.admin.employees);

//   const deleteEmployee = async (id) => {
//     id = JSON.stringify(id);
//     let data = await axios.get(
//       `http://localhost:8080/api/v1/delete_employee/:${id}`
//     );

//     if (data) {
//       toast.success(" Employee has been deleted", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       getEmployeeData(updateEmpData);
//     } else {
//       toast.error(" Somthing Went Wrong ", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };

//   const submitAlert = (key) => {
//     confirmAlert({
//       customUI: ({ onClose }) => {
//         return (
//           <div className="custom-confirm-alert">
//             <h1>Are you sure you want to delete Employe?</h1>
//             {/* <p>This action cannot be undone.</p> */}
//             <div className="button-container">
//               <button
//                 className="delete-button"
//                 onClick={() => {
//                   deleteEmployee(key);
//                   onClose();
//                 }}
//               >
//                 Yes, Delete
//               </button>
//               <button className="cancel-button" onClick={onClose}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         );
//       },
//     });
//   };

//   if (isAdminLogin) {
//     return (
//       <>
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//           style={{
//             fontSize: "1.8rem",
//             width: "fit-content",
//             padding: "0 2rem",
//           }}
//         />

//         <div className="all-employee-container">
//           <table border={2}>
//             <tr>
//               <th>
//                 <h1>Seriel Number</h1>
//               </th>
//               <th>
//                 <h1> Employee Name</h1>
//               </th>
//               <th>
//                 <h1> Employee Id </h1>
//               </th>
//               <th>
//                 <h1>Action</h1>
//               </th>
//             </tr>

//             {allEmployees.map((key, idx) => {
//               return (
//                 <tr>
//                   <td>
//                     {" "}
//                     <h1>{idx + 1}</h1>
//                   </td>
//                   <td>
//                     {" "}
//                     <h1>{key.name}</h1>
//                   </td>
//                   <td>
//                     {" "}
//                     <h1>{key.employee_id}</h1>{" "}
//                   </td>
//                   <td>
//                     {" "}
//                     <MdDeleteForever
//                       style={{
//                         color: "red",
//                         fontSize: "2.8rem",
//                         marginLeft: "10px",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => {
//                         submitAlert(key._id);
//                       }}
//                     />
//                   </td>
//                 </tr>
//               );
//             })}
//           </table>
//         </div>
//       </>
//     );
//   } else {
//     navigate("/");
//   }
// };

// export default Allemployee;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getEmployee } from "../../../slices/adminSlice";
import { getEmployeeData } from "../../../stateApis/stateapi";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Allemployee = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const isAdminLogin = useSelector((state) => state.admin.logindetails.isLogin);
  const navigate = useNavigate();

  //This is the code to update the react state instantly when the component renders;
  const updateEmpData = async (data) => {
    dispatch(getEmployee(data));
  };
  useEffect(() => {
    getEmployeeData(updateEmpData);
  }, []);

  const allEmployees = useSelector((state) => state.admin.employees);

  const filteredEmployees = allEmployees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteEmployee = async (id) => {
    id = JSON.stringify(id);
    let data = await axios.get(
      `http://localhost:8080/api/v1/delete_employee/:${id}`
    );

    if (data) {
      toast.success(" Employee has been deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getEmployeeData(updateEmpData);
    } else {
      toast.error(" Something Went Wrong ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const submitAlert = (key) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm-alert">
            <h1>Are you sure you want to delete Employee?</h1>
            <div className="button-container">
              <button
                className="delete-button"
                onClick={() => {
                  deleteEmployee(key);
                  onClose();
                }}
              >
                Yes, Delete
              </button>
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          fontSize: "1.8rem",
          width: "fit-content",
          padding: "0 2rem",
        }}
      />

      <div className="all-employee-container">
        <input
          type="text"
          placeholder="Search employee by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <table border={2}>
          <thead>
            <tr>
              <th>
                <h1>Serial Number</h1>
              </th>
              <th>
                <h1>Employee Name</h1>
              </th>
              <th>
                <h1>Employee Id</h1>
              </th>
              <th>
                <h1>Action</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, idx) => (
              <tr key={idx}>
                <td>
                  <h1>{idx + 1}</h1>
                </td>
                <td>
                  <h1>{employee.name}</h1>
                </td>
                <td>
                  <h1>{employee.employee_id}</h1>
                </td>
                <td>
                  <MdDeleteForever
                    style={{
                      color: "red",
                      fontSize: "2.8rem",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      submitAlert(employee._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Allemployee;
