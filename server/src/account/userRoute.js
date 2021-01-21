
const express = require("express");
let router = express.Router();
const userController = require("./userController");
const auth = require("../middleware/auth")
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs');
const DIR = './public/';
let User = require('./userModel');
let Image = require('./imageModel');

// Configure user related routes
router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/data", auth, userController.userList);
router.get("/imageList", auth, userController.imageList);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


router.delete("/deletepost/:id", auth, (req,res) => {

    console.log(req.userData)
    console.log(req.params.id)
    Image.deleteOne({_id:new mongoose.Types.ObjectId(req.params.id)}).then(docImage => {
        console.log("\n>> Deleted Image:\n", docImage);
    
         User.findOneAndUpdate(
          { _id: new mongoose.Types.ObjectId(req.userData.user._id) },
          { $pull: { images: new mongoose.Types.ObjectId(req.params.id) } },
          { new: true, useFindAndModify: false }
        ).then(result=>{
            //console.log("\n>> Deleted Under User:\n", result);

            console.log(result)
            res.status(201).json({
                message: "Done remove!"
                
            })
        });
        
      });

})
router.put("/upload",auth, upload.array('avatar',6), (req, res) => {
    let reqFiles = null;
    
    const url = req.protocol + '://' + req.get('host')
    console.log(url)
    reqFiles = url + '/public/' + req.files[0].filename;
    
   
    console.log(req.body.id)
    let imagedata = {
        name: req.files[0].filename,
        url: reqFiles,
        desc: req.body.desc,
        createdAt: Date.now(),
        createdBy:req.body.id,
        skills: req.body.skills
      }


         Image.create(imagedata).then(docImage => {
          console.log("\n>> Created Image:\n", docImage);
      
           User.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.body.id) },
            { $push: { images: docImage._id } },
            { new: true, useFindAndModify: false }
          );
          res.status(201).json({
            message: "Done upload!"
            
        })
        });
        
});

router.post("/create_video", auth, (req,res)=>{
    
})
module.exports = router;