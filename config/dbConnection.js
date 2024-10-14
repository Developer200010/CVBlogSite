const mongoose = require("mongoose");
const dotenv = require("dotenv");

const dbConnect = async () => {
  try {
    if (process.env.NODE_ENV === "local") {
      await mongoose
        .connect(process.env.LOCAL_DB_URL)
        .then(() => console.log("local db is connected successfully"))
        .catch((error) => console.log(error.message));
    }else{
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log("production db is running successfully"))
        .catch((error)=> console.log(error.message))
    }
  } catch (error) {
    console.log("db connection failed")
  }
};
module.exports = dbConnect;
