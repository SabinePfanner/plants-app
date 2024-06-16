import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the nested task schema
// Courtesy of chatGPT
const taskSchema = new Schema(
  {
    start: {
      type: Schema.Types.Mixed,
      default: null,
    },
    end: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  { _id: false }
);

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
  tasks: {
    type: Map,
    of: taskSchema,
    default: {
      Seed: { start: null, end: null },
      Cultivation: { start: null, end: null },
      Planting: { start: null, end: null },
      Harvest: { start: null, end: null },
      Pruning: { start: null, end: null },
    }, // Default to an empty object
  },
  image: { type: String },
  owner: { type: String, required: true },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
