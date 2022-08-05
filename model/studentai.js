import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Students = new Schema({
  name: String,
  lastname: String,
  adress: String,
  phone: String,
  email: String,
  selfcode: String,
});

export default mongoose.model("Students", Students);
