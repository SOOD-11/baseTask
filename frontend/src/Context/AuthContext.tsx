import React, { createContext, useContext, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance';
enum Role
{
HOST="HOST",
ATTENDEE="ATTENDEE"

};



type user=
{
 id:string,
email:string,
password:string,
role: Role
};

type AuthContextType={
    user:user | null,
      loading:boolean,
    setUser:(newUser:user)=> void ,
    setLoading:(newUser:boolean)=> void,
  
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext=createContext<AuthContextType>({
    
user: null ,
  setUser: () => {},
  loading: true,
  setLoading: ()=>{}

});




const AuthContextProvider = ({children}:AuthContextProviderProps) => {
    const [user,setUser]=React.useState<user | null>();
const [loading,setLoading]=React.useState(true);

    const fetchUser=async()=>{

try {
    const response=await axiosInstance.get('/user/me');
    console.log(response.data);
  
    setUser(response.data.safeUser);
} catch (error) {
   setUser(null);
  }finally{

     setLoading(false);

  } 
    


    };

useEffect(()=>{

fetchUser();
        
    },[]);
  return (
    <AuthContext.Provider value={{user,loading,setUser,setLoading}}>
    {children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;


 export const useAuthContext=()=> useContext(AuthContext);







