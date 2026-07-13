


const calculatePrice=async(eventId,tickets)=>{

try {
    const event=await db.Event.findByPk(eventId);

    const price=event?.price;
    const totalPrice=price * tickets;

    return totalPrice;

} catch (error) {

return Error.message || " something went wrong" ;


}



    






};

module.exports=calculatePrice;