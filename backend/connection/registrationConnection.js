import mongoose from "mongoose";

const url =
  "mongodb+srv://prakashm:Sum%40n1971@cluster0.ztoam.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0";

const db = () => {
  mongoose.connect(url);
  console.log("Databse connected");
};

export default db;
