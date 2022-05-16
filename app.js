require("dotenv").config(); // load environment config
// const connPool = 
const express = require("express");
const app = express();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    cb(null, date + "-" + time + "-" + file.originalname);
  }
})

const upload = multer({storage: storage});

app.use(express.urlencoded({extended: true}));

app.post("/uploadFile", upload.single('image'), (req, res) => {
	res.status(200).send("File is uploaded!!!");
});

app.post("/uploadMultipleFiles", upload.array('images', 6), (req, res) => {
        res.status(200).send("All files are uploaded!!!");
});

app.listen(process.env.PORT, () => {
	console.log(`Server is listening on ${process.env.PORT}`);
});
