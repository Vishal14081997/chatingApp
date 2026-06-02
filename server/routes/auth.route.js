const express= require("express")
const {signUp ,login ,getProfile ,getAllContacts ,updateProfile,imageupload} = require("../controllers/auth.controller")
const verifyToken = require("../middleware/verifyToken.middleware")
const upload = require("../middleware/multer.middleware")
const uploadToCloudinary = require("../middleware/cloudinary.middleware")

const router = express.Router()

router.post("/signup" , signUp)
router.post("/login" , login)
router.get("/getProfile" ,verifyToken,  getProfile)
router.get("/getAllContacts" ,verifyToken,  getAllContacts)
router.put("/updateProfile" ,verifyToken,  updateProfile)
router.post("/imageupload" ,upload.single("file") ,uploadToCloudinary ,imageupload )


module.exports = router;