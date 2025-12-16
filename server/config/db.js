import mongoose from "mongoose";

const connectdb = async () =>{
    try{
   await mongoose.connect("mongodb://127.0.0.1:27017/venue_booking");
   console.log("mongodb conncted");
    }catch(err){
        console.log(err);
    }
};

export default connectdb;