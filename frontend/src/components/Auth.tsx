import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { SignupInput } from "@zicox/medium_common";
//import { SigninInput } from "@zicox/medium_common";
import { BACKEND_URL } from "../config";
import axios from "axios";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
    const [postInputs , setPostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    });
    //trpc
    async function sendRequest(){
      try{ 
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"? "signup":"signin"}`,postInputs)
        const jwt = response.data;
        localStorage.setItem("token",jwt);
        navigate("/blogs");

      }catch(e){
        alert("Error while signing up")
      }
   }
  return <div className="h-screen flex justify-center flex-col">
    {JSON.stringify(postInputs)}
    
 <div className="flex justify-center">
        <div>
        <div className="text-xl display:inline-block font-extrabold">
          Create an account
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" text-slate-400">
          <div>
            {type==="signin"? " Don't have an account?":"Already have an account?"}
            <Link className="text-decoration-line: underline" to={type==="signin"?"/signup":"/signin"}>
             {type === "signin"?"Sign Up" : "Sign in"} 
            </Link>
          </div>
        </div>
        <div> {type==="signup"?<LabelledInput lable = "Name" placeholder="Tera naam bc" onChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                name:e.target.value
            }))
        }}/>:null}

        </div>
        <div><LabelledInput lable = "Email" placeholder="Email daal" onChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                email:e.target.value
            }))
        }}/>     

        </div>
        <div>
             <LabelledInput lable = "Password" type={"password"} placeholder="tijori" onChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                password:e.target.value
            }))
        }}/>
        </div>
        <button onClick={sendRequest} type="button" className="display:block   text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
         dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign up":"Sign in"}</button>

        </div>

       
          
      </div>
    
    </div>
    
}

    interface LabelledInputType{
        lable:string ;
        placeholder: string ;
        onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
        type?:string
    } 
    function LabelledInput({lable , placeholder , onChange ,type}:LabelledInputType){
        return <div>
        
            <label className="block mb-2 text-sm font-medium text-gray-900 ">{lable}</label>
            <input onChange={onChange} type={type||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    
        </div>
    }
  

