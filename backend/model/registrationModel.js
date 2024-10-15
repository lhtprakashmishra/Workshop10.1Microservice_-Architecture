import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  mobile: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    match: /^\d{10}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilePhoto: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
