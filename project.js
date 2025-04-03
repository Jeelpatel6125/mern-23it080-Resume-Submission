const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const port = 5000;

mongoose.connect('mongodb://localhost:27017/resume-submissions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));