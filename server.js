const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

mongoose
  .connect(
    "mongodb+srv://JoeyLaCroix:if7mndfYTN3B1CQn@cluster0.oaf8k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

  const surferSchema = new mongoose.Schema({
    name: String,
    bio: String,
    hometown: String,
    surftype: String,
    img_name: String,
  });
  
  const Surfer = mongoose.model("Surfer", surferSchema);

app.get("/api/surfers", async (req, res) => {
    const surfers = await Surfer.find();
    res.send(surfers);
  });

  app.get("/api/surfers/:id", async (req, res) => {
    const surfer = await Surfer.findOne({ _id: id });
    res.send(surfer);
  });


app.post("/api/surfers", upload.single("img"), (req, res) => {
    const result = validateSurfer(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    const surfer = {
      id: surfers.length + 1,
      name: req.body.name,
      hometown: req.body.hometown,
      surftype: req.body.surftype,
      bio: req.body.bio,
    };
  
    if (req.file) {
      surfer.img_name = req.file.filename;
    }
  
    surfers.push(surfer);
    res.status(200).send(surfer);
  });

  app.put("/api/surfers/:id", upload.single("img"), async (req, res) => {
    let surfer = surfers.find((s) => s._id === parseInt(req.params.id));
  
    if (!surfer) res.status(400).send("Surfer with given id was not found");
  
    const result = validateSurfer(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    let fieldsToUpdate = {
        name: req.body.name,
        bio: req.body.bio,
        hometown: req.body.hometown,
        surftype: req.body.surftype,
      };
  
    surfer.name = req.body.name;
    surfer.hometown = req.body.hometown;
    surfer.surftype = req.body.surftype;
    surfer.bio = req.body.bio;
  
    if (req.file) {
      surfer.main_image = "images/" + req.file.filename;
    }

    const wentThrough = await Surfer.updateOne(
        { _id: req.params.id },
        fieldsToUpdate
      );

      const updatedSurfer = await Surfer.findOne({ _id: req.params.id });
  res.send(updatedSurfer);
  
    res.send(surfer);
  });

  app.delete("/api/surfers/:id", (req, res) => {
    const surfer = surfers.find((s) => s._id === parseInt(req.params.id));
  
    if (!surfer) {
      res.status(404).send("The surfer with the given id was not found");
    }
  
    const index = surfers.indexOf(surfer);
    surfers.splice(index, 1);
    res.send(surfer);
  });
  

const validateSurfer = (surfer) => {
    const schema = Joi.object({
      id: Joi.allow(""),
      name: Joi.string().required(),
      hometown: Joi.string().required(),
      surftype: Joi.string().required(),
      bio: Joi.string().required(),
    });
  
    return schema.validate(surfer);
  };

app.listen(3001, () => {
    console.log("Listening....")
});