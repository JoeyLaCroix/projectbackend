const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

let surfers = [
    {
        "id": 1,
        "img_name": "mesurf.jpg",
        "name": "Joey LaCroix",
        "bio": "Joey LaCroix is a professional surfer from the North Shore of Oahu. He has been surfing since he was 5 years old and has won numerous competitions around the world. Joey is known for his aggressive style and fearless approach to big waves. He is sponsored by several major surf brands and is considered one of the top surfers in the world.",
        "hometown": "Haleiwa, Hawaii",
        "surftype": "Shortboard",
        "awards":[
            {
                "year": 2015,
                "award": "Surfer of the Year"
            },
            {
                "year": 2016,
                "award": "Biggest Wave Ridden"
            },
            {
                "year": 2017,
                "award": "Best Barrel Rider"
            }
        
        ]
    },
    {
        "id": 2,
        "img_name": "makani-kaimana.jpg",
        "name": "Makani Kaimana",
        "bio": "Makani Kaimana is a professional surfer from the Big Island of Hawaii. He grew up surfing the powerful waves of the Kona coast and has developed a unique style that combines traditional Hawaiian surfing techniques with modern maneuvers. Makani is known for his smooth, flowing style and his ability to ride the biggest waves with ease. He is sponsored by several major surf brands and is considered one of the top surfers in the world.",
        "hometown": "Kailua-Kona, Hawaii",
        "surftype": "Shortboard",
        "awards":[
            {
                "year": 2015,
                "award": "Surfer of the Year"
            },
            {
                "year": 2016,
                "award": "Biggest Wave Ridden"
            },
            {
                "year": 2017,
                "award": "Best Barrel Rider"
            }
        
        ]
    },
    {
        "id": 3,
        "img_name": "lani-kai.jpg",
        "name": "Lani Kai",
        "bio": "Lani Kai is a professional surfer from the island of Maui. She started surfing at a young age and quickly rose through the ranks to become one of the best to do it in Hawaii. Lani is known for her powerful style and her ability to pull off difficult maneuvers with ease. She is sponsored by several major surf brands and is considered one of the top surfers in the world.",
        "hometown": "Paia, Hawaii",
        "surftype": "Shortboard",
        "awards":[
            {
                "year": 2015,
                "award": "Surfer of the Year"
            },
            {
                "year": 2016,
                "award": "Biggest Wave Ridden"
            },
            {
                "year": 2017,
                "award": "Best Barrel Rider"
            }
        
        ]
    },
    {
        "id": 4,
        "img_name": "kai-mahina.jpg",
        "name": "Kai Mahina",
        "bio": "Kai Mahina is a professional surfer from the island of Kauai. He has been surfing since he was a child and has developed a unique style that combines power and finesse. Kai is known for his aggressive approach to big waves and his ability to pull off difficult maneuvers with ease. He is sponsored by several major surf brands and is considered one of the top surfers in the world.",
        "hometown": "Hanalei, Hawaii",
        "surftype": "Shortboard",
        "awards":[
            {
                "year": 2015,
                "award": "Surfer of the Year"
            },
            {
                "year": 2016,
                "award": "Biggest Wave Ridden"
            },
            {
                "year": 2017,
                "award": "Best Barrel Rider"
            }
        
        ]
    },
    {
        "id": 5,
        "img_name": "kellyslater.jpg",
        "name": "Kelly Slater",
        "bio": "Kelly Slater is a professional surfer from Cocoa Beach, Florida. He is widely regarded as one of the greatest surfers of all time and has won numerous world championships throughout his career. Kelly is known for his smooth, powerful style and his ability to ride the biggest waves with ease. He is sponsored by several major surf brands and is considered one of the top surfers in the world.",
        "hometown": "Cocoa Beach, Florida",
        "surftype": "Shortboard",
        "awards":[
            {
                "year": 2015,
                "award": "Surfer of the Year"
            },
            {
                "year": 2016,
                "award": "Biggest Wave Ridden"
            },
            {
                "year": 2017,
                "award": "Best Barrel Rider"
            }
        
        ]
    },
    {
        "id": 6,
        "img_name": "stephanie-gilmore.jpg",
        "name": "Stephanie Gilmore",
        "bio": "Stephanie Gilmore is a professional surfer from Murwillumbah, Australia. She is widely regarded as one of the greatest ever surfers of all time and has won numerous world championships throughout her career. Stephanie is known for her smooth, powerful style and her ability to ride the biggest waves with ease. She is sponsored by several major surf brands and is considered one of the top surfers in the world.",
        "hometown": "Murwillumbah, Australia",
        "surftype": "Shortboard",
        "awards":[
            {
                "year": 2015,
                "award": "Surfer of the Year"
            },
            {
                "year": 2016,
                "award": "Biggest Wave Ridden"
            },
            {
                "year": 2017,
                "award": "Best Barrel Rider"
            }
        
        ]
    },
    {
        "id": 7,
        "img_name": "gabriel-medina.jpg",
        "name": "Gabriel Medina",
        "bio": "Gabriel Medina is a professional surfer from Sao Paulo, Brazil. He is widely regarded as one of the greatest surfers of all time and has won numerous world championships throughout his career. Gabriel is known for his smooth, powerful style and his ability to ride the biggest waves with ease. He is sponsored by several major surf brands and is considered one of the top surfers in the world.",
        "hometown": "Sao Paulo, Brazil",
        "surftype": "Shortboard",
        "awards":[
            {
                "year": 2015,
                "award": "Surfer of the Year"
            },
            {
                "year": 2016,
                "award": "Biggest Wave Ridden"
            },
            {
                "year": 2017,
                "award": "Best Barrel Rider"
            }
        
        ]
    },
    {
        "id": 8,
        "img_name": "johnjohn.jpg",
        "name": "John John Florence",
        "bio": "John John Florence is a world-renowned surfer from Hawaii, famous for his powerful style and technical mastery. Raised on Oahu’s North Shore, he became a surfing prodigy, winning multiple world titles. Known for his versatility and innovation, John John is a global icon in the sport.",
        "hometown": "Oahu, Hawaii",
        "surftype": "Shortboard",
        "awards":[
            {
                "year": 2015,
                "award": "Surfer of the Year"
            },
            {
                "year": 2016,
                "award": "Biggest Wave Ridden"
            },
            {
                "year": 2017,
                "award": "Best Barrel Rider"
            }
        
        ]
    },
    {
        "id": 9,
        "img_name": "kanoa.jpg",
        "name": "Kanoa Igarashi",
        "bio": "Kanoa Igarashi is a professional surfer from Huntington Beach, California. He is widely regarded as one of the greatest surfers of all time and has won numerous world championships throughout his career. Kanoa is known for his smooth, powerful style and his ability to ride the biggest waves with ease. He is sponsored by several major surf brands and is considered one of the top surfers in the world.",
        "hometown": "Huntington Beach, California",
        "surftype": "Shortboard",
        "awards":[
            {
                "year": 2015,
                "award": "Surfer of the Year"
            },
            {
                "year": 2016,
                "award": "Biggest Wave Ridden"
            },
            {
                "year": 2017,
                "award": "Best Barrel Rider"
            }
        
        ]
    }
];



app.get("/api/surfers", (req,res)=>{
    res.json(surfers);
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
      surfer.main_image = req.file.filename;
    }
  
    surfers.push(surfer);
    res.status(200).send(surfer);
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