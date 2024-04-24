import mongoose from "mongoose";

let isConnected = false; //variable to track the status of connectino

//fucntion that handles the connection
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  //
  if (!process.env.MONGODB_URI)
    return console.log("Error Connecting the Database.");

  // if we have connected
  if(isConnected) return console.log("=> using existing database connection");

// if we have connected to db but isnt working
try{
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connection to Database Successful.")

} catch (error:any){
    console.log(error);
}

};
