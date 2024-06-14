import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the nested schema for 'seed'
// Courtesy of chatGPT
const seedSchema = new Schema({
  start: {
    type: Schema.Types.Mixed,
    default: null
  },
  end: {
    type: Schema.Types.Mixed,
    default: null
  }
}, { _id: false });

// Define the schema for 'tasks'
const tasksSchema = new Schema({
  seed: {
    type: seedSchema,
    default: { start: null, end: null } 
  }
}, { _id: false });

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
    type: tasksSchema,
    default: { seed: { start: null, end: null }}
  },
  // tasks: { type: String },
  image: { type: String },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
