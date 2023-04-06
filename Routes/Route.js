const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')
const initData = require('../InitData/initData')
const User = require("../Model/Instaclone")
const cors = require('cors')
const fs = require('fs')
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors())


async function setInitData() {                // Preloading the initial data


    const data = await User.find({})
    if (data.length == 0) {
        initData.map((item) => {

            const imagePath = item.image
            const imageData = fs.readFileSync(imagePath);
            console.log(imagePath)

            User.create({
                name: item.name,
                location: item.location,
                likes: item.likes,
                description: item.description,
                image: {
                    data: imageData,
                    contentType: 'image/jpg'
                },
                date: item.date
            })
        })
    }

}
setInitData()



router.get("/viewposts", async (req, res) => {    // Get request for view posts
    try {
        const data = await User.find()

        res.status(200).json({
            data,
            status: "Success"
        })
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }

})

router.post('/newpost', upload.single('image'), async (req, res) => {
    console.log(req.body.image)  
      
    const base64Image = req.body.image
    const imageBuffer = new Buffer.from(base64Image, 'base64')


    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            likes: 0,
            description: req.body.description,
            image: {
                data: imageBuffer,
                contentType: 'image/jpg'
            },
            date: new Date()
        })
        res.status(200).json({
            status: "Success",
        })
    }
    catch (error) {

    }
})


module.exports = router

