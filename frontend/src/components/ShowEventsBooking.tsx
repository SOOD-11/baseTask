import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'


type user={

username:string,
email:string

}
type Booking={
id:number,
tickets:number,
User: user,





}


type showEventsBookingProps={

  eventId: number;

  onClose: () => void;



}

const ShowEventsBooking = ({eventId,onClose}:showEventsBookingProps) => {
  const [bookings,setBookings]=useState<Booking[]>([]);


  useEffect(()=>{
const showBooking=async (eventId:any)=>{

try {
  const response=await axiosInstance.get(`/booking/get-bookings/${eventId}`
  );

  console.log(response);
  setBookings(response.data.Bookings);

} catch (error) {
  console.log(error);
}

}
showBooking(eventId);

  },[])

  
  return (

    <div className='p-3 x-50 y-50 bg-white flex flex-col items-center'>
<div className='text-2xl text-black'>><h1 className='text-black'>Event Bookings</h1></div
{bookings.length === 0 ?(<h2> No Booking for this Event </h2> ):

(
bookings.map((booking,index)=>{
  return (

<div key={booking.id}>
<div className='bg-white text-2xl text-black flex flex-row justify-around'>
  <><p>{index+1}</p></>
  <><p>{booking.User.username}</p></>
  <><p>{booking.User.email}</p></>
  <><p>{booking.tickets}</p></>

</div>


  </div>




  )







}))

}

<button  type='button' onClick={onClose}>close</button>

    </div>
    
  )
}

export default ShowEventsBooking;