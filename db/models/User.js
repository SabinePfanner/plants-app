import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  owner: { type: String, required: true },
  favorites: { type: Array, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
