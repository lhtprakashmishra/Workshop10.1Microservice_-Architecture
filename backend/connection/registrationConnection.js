import mongoose from "mongoose";

const db = (url) => {
  mongoose.connect(url);
  console.log("Databse connected");
};

export default db;
