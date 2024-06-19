import mongoose from "mongoose";

const { Schema } = mongoose;

const favoriteSchema = new Schema({
  owner: { type: String, required: true },
  favorites: { type: Array, required: true },
});

const Favorites =
  mongoose.models.Favorites || mongoose.model("Favorites", favoriteSchema);

export default Favorites;
