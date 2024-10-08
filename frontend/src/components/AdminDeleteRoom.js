import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import RoomCategory from '../helpers/RoomCategory';
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminDeleteRoom = ({
    onClose,
    RoomData,
    fetchData
}) => {
    const [data,setData] = useState({
        ...RoomData,
        Roomnumber:RoomData?.Roomnumber,
        category:RoomData?.category,
        type:RoomData?.type,
        airconditioning:RoomData?.airconditioning,
        beds:RoomData?.beds,
        RoomImage:RoomData?.RoomImage,
        
        /*
        title : RoomData?.title,
        description : RoomData?.description,
        category : RoomData?.category,
        packImage : RoomData?.packImage,
        price : RoomData?.price,
        discount : RoomData?.discount,
        endDate : RoomData?.endDate,
        */
        status :RoomData?.status
      })
      const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
      const [fullScreenImage,setFullScreenImage] = useState("")
    
      const handleOnChange = (e)=>{
        const { name, value} = e.target
    
        setData((preve)=>{
          return{
            ...preve,
            [name]  : value
          }
        })
      }
    
      const handleUploadImg = async(e) => {
        const file = e.target.files[0]
        // SetUploadImageInput(file.name)
        // console.log("file",file)
    
        const uploadImageCloudinary = await uploadImage(file) 
        setData((preve)=>{
          return{
            ...preve,
            RoomImage : [ ...preve.RoomImage, uploadImageCloudinary.url]
          }
        })
        // console.log("upload image",uploadImageCloudinary.url)
      }
    
      const handleDeleteImage = async(index)=>{
        console.log("image index",index)
        
        const newRoomImage = [...data.RoomImage]
        newRoomImage.splice(index,1)
    
        setData((preve)=>{
          return{
            ...preve,
            RoomImage : [...newRoomImage]
          }
        })
        
      }
    
        {/**upload Room */}
        const handleSubmit = async(e) =>{
          e.preventDefault()
          
          const response = await fetch(SummaryApi.delete_Room.url,{
            method : SummaryApi.delete_Room.method,
            credentials : 'include',
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })
      
          const responseData = await response.json()
      
          if(responseData.success){
              toast.success(responseData?.message)
              onClose()
              fetchData()
          }
      
      
          if(responseData.error){
            toast.error(responseData?.message)
          }
        
      
        }
      return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
          <div className='bg-white p-3 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='flex justify-between items-center pb-3'>
              <h2 className='font-bold text-lg'>Delete Room</h2>
              <div
                className='w-fit ml-auto text-2xl hover:bg-red-600 aspect-square hover:text-white cursor-pointer'
                onClick={onClose}
              >
                <IoMdClose />
              </div>
            </div>
          <form className='grid p-1 gap-1 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                <label htmlFor='title' className='mt-3'>Status :</label>
                <select 
                  type='status' 
                  placeholder='status' 
                  name='status'
                  value={data.status} 
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  readOnly
                > 
                  <option value={"Active"}>Active</option>
                  <option value={"Deactivate"}>Deactivate</option>
                </select>

                <label htmlFor='Roomnumber' className='mt-3'>Room Number :</label>
                <input 
                  type='number' 
                  id='Roomnumber' 
                  placeholder='room number' 
                  name='Roomnumber'
                  value={data.Roomnumber} 
                  onChange={handleOnChange}
                  className='p-1 bg-slate-100 border rounded'
                  readOnly
                />
                
                {/* <label htmlFor='category' className='mt-3'>Category :</label>
                <input 
                  type='text' 
                  id='category' 
                  placeholder='category' 
                  name='category'
                  value={data.category} 
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  readOnly
                /> */}
                <label htmlFor='airconditioning' className='mt-3'>Air conditioning :</label>
                <input 
                  type='text' 
                  id='airconditioning' 
                  placeholder='airconditioning' 
                  name='airconditioning'
                  value={data.airconditioning} 
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  readOnly
                />
                <label htmlFor='beds' className='mt-3'>Beds :</label>
                <input 
                  type='text' 
                  id='beds' 
                  placeholder='beds' 
                  name='beds'
                  value={data.beds} 
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  readOnly
                />

    
                <label htmlFor='category' className='mt-3'>Category :</label>
                <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                    <option value={""}>Select Category</option>
                    {
                        RoomCategory.map((el,index)=>{
                        return(
                            <option value={el.value} key={el.value+index}>{el.label}</option>
                        )
                        })
                    }
                </select>
    
                <label htmlFor='type' className='mt-3'>Type :</label>
                <textarea 
                  type='text' 
                  placeholder='type' 
                  name='type'
                  value={data.type} 
                  onChange={handleOnChange}
                  className='h-28 bg-slate-100 border resize-none p-1'
                  readOnly
                >
                </textarea>  
                 
                <label htmlFor='RoomImage' className='mt-3'>Image :</label>
                <label htmlFor='uploadImageInput'>
                <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                              <span className='text-4xl'><IoMdCloudUpload/></span>
                              <p className='text-sm'>Upload Image</p>
                              <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadImg}/>
                            </div>
                </div>
                </label> 
                <div>
                     {
                        data?.RoomImage[0] ? (
                            <div className='flex items-center gap-2'>
                                {
                                  data.RoomImage.map((el,index)=>{
                                    return(
                                      <div className='relative group'>
                                          <img 
                                            src={el} 
                                            alt={el} 
                                            width={80} 
                                            height={80}  
                                            className='bg-slate-100 border cursor-pointer'  
                                            onClick={()=>{
                                              setOpenFullScreenImage(true)
                                              setFullScreenImage(el)
                                            }}
                                            />
    
                                            <div className='absolute bottom-0 right-0 p-1 text-red-600 bg-white rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteImage(index)}>
                                              <MdDelete/>  
                                            </div>
                                      </div>
                                      
                                    )
                                  })
                                }
                            </div>
                        ) : (
                          <p className='text-red-600 text-xs'>*Please upload  image</p>
                        )
                      }
                </div>
                {/* <label htmlFor='price'>Price :</label>
                <input 
                  type='number' 
                  id='price' 
                  placeholder='price' 
                  name='price'
                  value={data.price} 
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  readOnly
                />  */}
    
                {/* <label htmlFor='discount' className='mt-3'>Discount :</label>
                <input 
                  type='number' 
                  id='discount' 
                  placeholder=' discount' 
                  name='discount'
                  value={data.discount} 
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  readOnly
                />
    
                <label htmlFor='endDate' className='mt-3'>End Date :</label>
                <input 
                  type='date' 
                  id='endDate' 
                  name='endDate'
                  value={data.endDate} 
                  onChange={handleOnChange}
                  className='p-2 bg-slate-100 border rounded'
                  readOnly
                />  */}
                <button className='px-3 py-2 bg-rose-600 hover:bg-rose-700'>Delete</button>
          </form>
          </div>
           {/***display image full screen */}
           {
            openFullScreenImage && (
              <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )
           }
        </div>
      );
}

export default AdminDeleteRoom
