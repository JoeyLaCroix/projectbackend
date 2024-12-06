const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const mongoose = require("mongoose");

// Middleware
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// MongoDB Connection
mongoose
  .connect("mongodb+srv://JoeyLaCroix:if7mndfYTN3B1CQn@cluster0.oaf8k.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Couldn't connect to MongoDB", error);
  });

// Mongoose Schema and Model
const surferSchema = new mongoose.Schema({
  name: String,
  bio: String,
  hometown: String,
  surftype: String,
  img_name: String,
});

const Surfer = mongoose.model("Surfer", surferSchema);

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Get All Surfers
app.get("/api/surfers", async (req, res) => {
  try {
    const surfers = await Surfer.find();
    res.send(surfers);
  } catch (err) {
    res.status(500).send("Error fetching data: " + err);
  }
});

// Get Surfer by ID
app.get("/api/surfers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const surfer = await Surfer.findById(id);
    if (!surfer) {
      return res.status(404).send("Surfer not found");
    }
    res.send(surfer);
  } catch (err) {
    res.status(500).send("Error fetching surfer: " + err);
  }
});

// Add a New Surfer
app.post("/api/surfers", upload.single("img"), async (req, res) => {
  const result = validateSurfer(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const surfer = new Surfer({
    name: req.body.name,
    bio: req.body.bio,
    hometown: req.body.hometown,
    surftype: req.body.surftype,
    img_name: req.file ? req.file.filename : null,
  });

  try {
    const newSurfer = await surfer.save();
    res.send(newSurfer);
  } catch (err) {
    res.status(500).send("Error saving surfer: " + err);
  }
});

// Update a Surfer
app.put("/api/surfers/:id", upload.single("img"), async (req, res) => {
  const { id } = req.params;
  const result = validateSurfer(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const fieldsToUpdate = {
    name: req.body.name,
    bio: req.body.bio,
    hometown: req.body.hometown,
    surftype: req.body.surftype,
  };

  if (req.file) {
    fieldsToUpdate.img_name = req.file.filename;
  }

  try {
    const updatedSurfer = await Surfer.findByIdAndUpdate(id, fieldsToUpdate, {
      new: true,
    });

    if (!updatedSurfer) {
      return res.status(404).send("Surfer not found");
    }

    res.send(updatedSurfer);
  } catch (err) {
    res.status(500).send("Error updating surfer: " + err);
  }
});

// Delete a Surfer
app.delete("/api/surfers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSurfer = await Surfer.findByIdAndDelete(id);

    if (!deletedSurfer) {
      return res.status(404).send("Surfer not found");
    }

    res.send(deletedSurfer);
  } catch (err) {
    res.status(500).send("Error deleting surfer: " + err);
  }
});

// Joi Validation Function
const validateSurfer = (surfer) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    hometown: Joi.string().required(),
    surftype: Joi.string().required(),
    bio: Joi.string().required(),
  });

  return schema.validate(surfer);
};

// Start the Server
app.listen(3001, () => {
  console.log("Listening on port 3001...");
});
