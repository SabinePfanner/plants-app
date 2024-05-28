import mongoose from "mongoose";

const { Schema } = mongoose;

const plantSchema = new Schema({
  name: { type: String, required: true },
  botanicalName: { type: String, required: true },
  waterDemand: { type: String, required: true },
  nutrientDemand: { type: String, required: true },
  growingConditions: { type: String, required: true },
  placement: { type: String, required: true },
  perennial: { type: Boolean, required: true },
  frostSensitive: { type: Boolean, required: true },
  cropType: { type: String, required: true },
  image: { type: String, required: true },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
