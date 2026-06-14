import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Item={
_id: number,
name: string,
createdAt: string,
updatedAt: string

}
const Itemspage = () => {

    const [item,setItems]= useState<Item[]>([]);
    const [date,setDate]=useState<string>("");
    const [name,setName]=useState<string>("");
   
   
    const FetchAllItems=async()=>{

try {
    const res=await axios.get(`${import.meta.env.VITE_BASE_URL}`);
    setItems(res.data);
         
} catch (error) {
    console.log(error);
}
    }
    const SearchByName= async ()=>{

try {
    const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/search`,{
    
       params :{name} 
    });
    setItems(res.data);
} catch (error) {

    console.log(error);
    
}




    }


    const SearchByDate=async ()=>{

try {
    
    const res= await axios.get(`${import.meta.env.VITE_BASE_URL}/by-date`,{
    
    params: {date} ,
    
    });
    setItems(res.data);
    
    
    
} catch (error) {
    console.log(error)
}

    }
useEffect(()=>{

FetchAllItems();
    
},[])
    
  return (
    <div className="space-y-2">
    <div>Itemspage</div>
    <div>
<input 
type="text"
placeholder="search by name"
value={name}
onChange={(e) => setName(e.target.value)}
className='bg-white'
></input>

<button  className="bg-red-500" onClick={SearchByName}>Search</button>

    </div>

    <div>

<input type="date"
value ={date} 
onChange={(e)=> setDate(e.target.value)}
className='bg-white text-black rounded-t-sm'   />
<button onClick={SearchByDate} className='bg-amber-300'> filter </button>
    </div>
    <div>
        {item.length === 0 ?(<p> No items found </p>)

    : (
item.map((Item,index)=>{
    return (

<div key={Item?._id} className="border-2 rounded-2xl">
    <h2> {index+1}.{Item.name}</h2>
    <h4>Created on {new Date(Item.createdAt).toLocaleDateString()}</h4>
</div>




    )






}) )


}

    </div>

    </div>
  )
}

export default Itemspage;