import { useState,useEffect } from "react";
import axios from "axios";
import utilities from "./utilities";


const useFetch = (endpoint,query,find) => {

    const {BearerKey,ipAdresse}=utilities();
    const [data,setData]=useState([]);
    const [isloading,setIsloading]=useState(false);
    const [error,setError]= useState(null);
    const options={
        method:'GET',
        url:`http://${ipAdresse}:8080/muslimApi/v1/${endpoint}`,
        headers:{
            'Authorization':'Bearer '+BearerKey
        },
        params: {...query}, 
    };

    const fetchData=async() => {
        setIsloading(true);

        try{
            const response=await axios.request(options);
            if(find){
                setData(response.data);
            }else
            setData(response.data.content);
            setIsloading(false);
        }catch(error) {
            setError(error)
            //console.log(error);
            alert('un probleme est survenu lors du fetch, '+error)
        }finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        fetchData();

    }, []);
    const refetch = () => {
        setIsloading(true);
        fetchData();
    }


    return {data,isloading,error,refetch};
}
export default useFetch