import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
const [error,setError]=useState<string>("");
const [loading,setLoading]=useState(false);
const [formdata,setFormdata]=useState({
    email:"",
    password:"",
    confirmPassword:"",
    username:"",
    role:"ATTENDEE"
 });
const navigate=useNavigate();

const handleSubmit =async(e:any)=>{

e.preventDefault();

const form=new FormData();
form.append("email",formdata.email);
form.append("password",formdata.password);
form.append("confirmPassword",formdata.confirmPassword);
form.append("username",formdata.username);
form.append("role",formdata.role);


if(formdata.password!==formdata.confirmPassword){

    setError("Enter the same password in both fields");
    return;
}
const payLoad={
email:formdata.email,
password:formdata.password,
username:formdata.username,
role:"ATTENDEE"
};
setLoading(true);
setError("");

try {
    
  const response= await axiosInstance.post('/user/signIn',payLoad);
   if (response.status === 201 || response.status === 200) {
      navigate('/login');
    }

   
} catch (error:any) {
console.log(error);
    setError(error.response?.data?.message);
    setLoading(false);
}finally{

    setLoading(false);
}




}

  return (
    <div className='fixed inset-1 min-w-full  bg-white flex items-center justify-around' >
        <h1 className='text-red-500'>Sign Up</h1>
        <h1 className='text-black'> To book Events</h1>
<form  onSubmit={handleSubmit} className=' z-5 flex flex-col justify-around items-center min-w-2xl gap-y-4 gap-4'>

 {error && <div className="bg-white text-red">{error}</div>}
    
<input type='email' 
placeholder= "Email" 
value={formdata.email} 
className=' bg-white border-2 text-black'
onChange={(e)=>setFormdata({ ...formdata,email:(e.target.value)})

} />

<input type="password" 
value={formdata.password} 
placeholder="password" 
className='rounded-2xl border-2 text-black'
onChange={
    (e)=>setFormdata({ ...formdata,password: e.target.value})
}/>
<input type="text" value={formdata.username} placeholder='Username' className='border-2  text-black' onChange={(e)=>setFormdata({...formdata,username:e.target.value})}/>

<input type="password" 
value={formdata.confirmPassword} 
placeholder="confirm Password" 
className='bg-white min-h-6 border-2 text-black'
disabled={loading}
onChange={
    (e)=>setFormdata({ ...formdata,confirmPassword: e.target.value})
}/>                       
             <button type="submit" className="bg-red-500 text-shadow-black px-6 py-2"> 
             {loading ? "Signning in" :"signIn"}
                 </button>

      <a href='/host-signUp'>Register as a Host</a>
         </form>
    </div>
  )
}


export default SignUp;