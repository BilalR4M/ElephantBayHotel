// import "./workpages.css";
// import axios from "axios";
// import { getTask } from "../../../slices/adminSlice";
// import { getTaskData } from "../../../stateApis/stateapi";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { MdDeleteForever } from "react-icons/md";
// import { GrUpdate } from "react-icons/gr";
// import { useNavigate } from "react-router-dom";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Alltask = () => {
//   const [assignval, setassignval] = useState("");
//   const dispatch = useDispatch();
//   const taskdata = useSelector((state) => state.admin.employees);
//   const navigate = useNavigate();

//   const updateTaskData = async (data) => {
//     dispatch(getTask(data));
//   };
//   useEffect(() => {
//     getTaskData(updateTaskData);
//   }, []);

//   const allTasks = useSelector((state) => state.admin.tasks);
//   const allEmployees = useSelector((state) => state.admin.employees);

//   //  alert dialoge

//   const deleteTask = async (id) => {
//     id = JSON.stringify(id);

//     let data = await axios.get(
//       "http://localhost:8080/api/v1/deletetask/:" + id
//     );
//     if (data) {
//       toast.success(" Task has been deleted", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       getTaskData(updateTaskData);
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
//             <h1>Are you sure you want to delete Task?</h1>
//             {/* <p>This action cannot be undone.</p> */}
//             <div className="button-container">
//               <button
//                 className="delete-button"
//                 onClick={() => {
//                   deleteTask(key);
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
  

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         style={{ fontSize: "1.8rem", width: "fit-content", padding: "0 2rem" }}
//       />

//       <div className="all-task-container">
//         <table border={2}>
//           <tr>
//             <th>
//               <h1>Sno.</h1>
//             </th>

//             <th>
//               <h1>Task Title</h1>
//             </th>

//             <th>
//               <h1> Task discription </h1>
//             </th>

//             <th>
//               <h1>Assign on</h1>
//             </th>
//             <th>
//               <h1>Deadline</h1>
//             </th>
//             <th>
//               <h1>Assign to</h1>
//             </th>
//             <th>
//               <h1>Status</h1>
//             </th>
//             <th>
//               <h1>Action</h1>
//             </th>
//           </tr>
//           {allTasks.map((key, idx) => {
//             return (
//               <>
//                 <tr>
//                   <td>
//                     <h1>{idx + 1}</h1>
//                   </td>
//                   <td>
//                     <h1>{key.title}</h1>
//                   </td>

//                   <td>
//                     <h1>{key.discription}</h1>
//                   </td>

//                   <td>
//                     <h1> {key.startdate.split('T')[0]} </h1>
//                   </td>

//                   <td>
//                     <h1>{key.enddate.split('T')[0]}</h1>
//                   </td>

//                   {/* filtering the perticular assigned task */}
//                   <td>
//                     {allEmployees
//                       .filter((key2) => {
//                         return key2._id == key.assign;
//                       })
//                       .map((key3) => {
//                         return <h1>{key3.name}</h1>;
//                       })}
//                   </td>

//                   <td>
//                     <h1>{key.status}</h1>
//                   </td>
//                   <td>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-around",
//                         alignItems: "center",
//                       }}
//                     >
//                       <MdDeleteForever
//                         style={{
//                           color: "red",
//                           fontSize: "2.4rem",
//                           marginLeft: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => {
//                           submitAlert(key._id);
//                         }}
//                       />
//                       <GrUpdate
//                         style={{
//                           color: "green",
//                           fontSize: "2.2rem",
//                           marginRight: "20px",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => {
//                           navigate("/dashboard/updatetask/" + key._id);
//                         }}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               </>
//             );
//           })}
//         </table>
//       </div>
//     </>
//   );
// };

// export default Alltask;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getTask } from "../../../slices/adminSlice";
import { getTaskData } from "../../../stateApis/stateapi";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alltask = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const dispatch = useDispatch();
  const taskdata = useSelector((state) => state.admin.employees);
  const navigate = useNavigate();

  const updateTaskData = async (data) => {
    dispatch(getTask(data));
  };
  useEffect(() => {
    getTaskData(updateTaskData);
  }, []);

  const allTasks = useSelector((state) => state.admin.tasks);
  const allEmployees = useSelector((state) => state.admin.employees);

  useEffect(() => {
    setFilteredTasks(
      allTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, allTasks]);

  const deleteTask = async (id) => {
    id = JSON.stringify(id);

    let data = await axios.get(
      "http://localhost:8080/api/v1/deletetask/:" + id
    );
    if (data) {
      toast.success(" Task has been deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getTaskData(updateTaskData);
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
            <h1>Are you sure you want to delete Task?</h1>
            <div className="button-container">
              <button
                className="delete-button"
                onClick={() => {
                  deleteTask(key);
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
        style={{ fontSize: "1.8rem", width: "fit-content", padding: "0 2rem" }}
      />

      <div className="all-task-container">
        <input
          type="text"
          placeholder="Search task by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <table border={2}>
          <tr>
            <th>
              <h1>Sno.</h1>
            </th>

            <th>
              <h1>Task Title</h1>
            </th>

            <th>
              <h1> Task discription </h1>
            </th>

            <th>
              <h1>Assign on</h1>
            </th>
            <th>
              <h1>Deadline</h1>
            </th>
            <th>
              <h1>Assign to</h1>
            </th>
            <th>
              <h1>Status</h1>
            </th>
            <th>
              <h1>Action</h1>
            </th>
          </tr>
          {filteredTasks.map((key, idx) => {
            return (
              <>
                <tr key={idx}>
                  <td>
                    <h1>{idx + 1}</h1>
                  </td>
                  <td>
                    <h1>{key.title}</h1>
                  </td>

                  <td>
                    <h1>{key.discription}</h1>
                  </td>

                  <td>
                    <h1> {key.startdate.split('T')[0]} </h1>
                  </td>

                  <td>
                    <h1>{key.enddate.split('T')[0]}</h1>
                  </td>

                  <td>
                    {allEmployees
                      .filter((key2) => key2._id === key.assign)
                      .map((key3) => {
                        return <h1 key={key3._id}>{key3.name}</h1>;
                      })}
                  </td>

                  <td>
                    <h1>{key.status}</h1>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <MdDeleteForever
                        style={{
                          color: "red",
                          fontSize: "2.4rem",
                          marginLeft: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          submitAlert(key._id);
                        }}
                      />
                      <GrUpdate
                        style={{
                          color: "green",
                          fontSize: "2.2rem",
                          marginRight: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate("/dashboard/updatetask/" + key._id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Alltask;
