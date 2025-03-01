const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const { log } = require("console");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.post("/read", async (req, res) => {
  await userModel.create({
    name: req.body.Name,
    email: req.body.Email,
    image: req.body.Image,
  });
  res.redirect("read");
});

app.post("/update/:id", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { name: req.body.newName },
    { new: true }
  );
  res.redirect("/read");
  console.log(updatedUser);
});

app.listen(3000);
