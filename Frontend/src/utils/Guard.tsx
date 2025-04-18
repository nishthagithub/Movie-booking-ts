import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'; 
import { Navigate } from "react-router-dom";
interface BookingGuardProps {
  children: React.ReactNode;
}

const Guard:React.FC<BookingGuardProps>=({children})=>{
    const bookingInProgess =useSelector((state:RootState)=>state.slot.bookingInProgress);
      const selectedSlots = useSelector(
        (state: RootState) => state.slot.selectedSlots
      );
      const hasSelectedSeats = selectedSlots && selectedSlots.length > 0;
      console.log("bookingInProgress", bookingInProgess);
    //   console.log("hasCompletedPayment", hasCompletedPayment);
      console.log("selectedSlots", selectedSlots);
      if (!bookingInProgess  || !hasSelectedSeats) {
        return <Navigate to="/" />;
      }
    //   if(hasCompletedPayment){
    //     return <Navigate to=""/>
    //   }
      

       return <>{children}</>;
}
export default Guard