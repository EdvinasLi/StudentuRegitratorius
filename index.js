import mongoose from "mongoose";
import students from "./model/studentai.js";
import express from "express";
import { engine } from "express-handlebars";
import fs from "fs/promises";
import studentai from "./model/studentai.js";

const connect = await mongoose.connect("mongodb://localhost:27017/students");
const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use("/public", express.static("public"));
//
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  let printer = await studentai.find().lean();
  console.log(printer);

  if (printer.length === 0)
    return res.render("admin", {
      message: "nera jokiu studentu",
      status: "danger",
    });

  res.render("admin", { printer });
});

app.post("/", async (req, res) => {
  const newstudent = new studentai();
  newstudent.name = req.body.name;
  newstudent.lastname = req.body.lastname;
  newstudent.adress = req.body.adress;
  newstudent.phone = req.body.phone;
  newstudent.email = req.body.email;
  newstudent.selfcode = req.body.selfcode;
  newstudent.save();
  res.render("admin");
});
app.listen(3000);
