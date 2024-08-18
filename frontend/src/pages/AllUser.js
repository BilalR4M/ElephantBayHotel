import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { BiEdit } from 'react-icons/bi';

// Now you can use <BiEdit /> wherever you need the edit icon

import { MdDeleteForever } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUser = () => {
  const [allUser,setAllUsers] = useState([])
  const [openUpdateRole,setOpenUpdateRole] = useState(false)
  const [updateUserDetails,setUpdateUserDetails] = useState({
    email : "",
    name: "",
    role: "",
    _id: "",
  })

  const fetchAllUsers = async() =>{
    const fetchData = await fetch(summaryApi.alluser.url,{
      method: summaryApi.alluser.method,
      credentials: 'include'
    })
    const dataResponse = await fetchData.json()

    if(dataResponse.success){
      setAllUsers(dataResponse.data)
    }
    if(dataResponse.error){
      toast.error(dataResponse.message)
    }

   // console.log(dataResponse)

  }
  useEffect(()=>{
    fetchAllUsers()
  },[])
  return (
    <div  className='white pt-24 pl-4'>
      <table className='w-full userTable  text-navy-600 dark:text-white'>
        <thead>
          <th>SeriNo</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created Date</th>
          <th>Action</th>
        </thead>
        <tbody>
          {
            allUser.map((el,index) =>{
              return(
                <tr>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LL')}</td>
                  <td>
                    <button className=' cursor-pointer  text-3xl text-green-700 hover:text-green-700 hover:scale-115 '
                    onClick={()=>{
                      setUpdateUserDetails(el)
                      setOpenUpdateRole(true)
                      

                    }}
                    >
                    <BiEdit/>
                    </button>
                  </td>
                  <td>
                    <button className='cursor-pointer text-3xl text-red-500 hover:text-red-700 hover:scale-115'>
                    <MdDeleteForever/>
                    </button>
                  </td>
                </tr>
            )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole && (
          <ChangeUserRole onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )
      }
      
    </div>
  )
}

export default AllUser
