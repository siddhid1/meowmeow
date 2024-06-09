import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import {  useNavigate } from "react-router-dom";


export const Publish = () => {
    const [title,setTitle]= useState("")
    const [description,setDescription] = useState("")
    const navigate = useNavigate();
  return (<div>
    <Appbar/>
    <div className="flex justify-center w-full">

    <div className="max-w-screen-lg w-full">
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        Likho 
      </label>
      <input
        onChange={(e)=>{
            setTitle(e.target.value)
        }}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Title do"
      />
    </div>

  </div>
  <TextEditor onChange={(e)=>{
    setDescription(e.target.value)
  }} />
  <button onClick={async()=>{
    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
        title,
        content:description
    },{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })
    navigate(`/blog/${response.data.id}`)
   }
   } type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
       Publish post
   </button>
  </div>);
};


function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
    return <div>
        <form>
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
           
       <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
           <label  className="sr-only">Publish post</label>
           <textarea onChange={onChange}id="editor" rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write an article..." required />
       </div>
   </div>
   
    </div>
    </form>


    </div>


}