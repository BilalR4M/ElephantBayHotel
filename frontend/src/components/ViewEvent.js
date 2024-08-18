import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewEvent=()=>{

    const[events, setEvents]=useState([]);
    const {id}=useParams();
    //console.log('AAA',id)

    useEffect(()=> {

            fetchEvent();




    },
    [id]


)
    const { ename, edate, stime, etime, available, descrip }=events;
    const fetchEvent=async(id)=>{
        try{
            //const {id}=useParams();
            const response = await axios.get("http://localhost:8080/api/event/"+id);
            setEvents(response.data);
        }catch(error){

            console.error("Error fetching events:",error);

        }


    


    }
        return(

            <>
            {ename}
            
            
            
            </>


        )


}

export default ViewEvent;