const express= require("express")
const {signUp ,login ,getProfile ,getAllContacts ,updateProfile,imageupload ,googleLogin} = require("../controllers/auth.controller")
const verifyToken = require("../middleware/verifyToken.middleware")
const upload = require("../middleware/multer.middleware")
const uploadToCloudinary = require("../middleware/cloudinary.middleware")

const router = express.Router()

router.post("/signup" , signUp)
router.post("/login" , login)
router.post("/googleLogin" , googleLogin)
router.get("/getProfile" ,verifyToken,  getProfile)
router.get("/getAllContacts" ,verifyToken,  getAllContacts)
router.put("/updateProfile" ,verifyToken, upload.single("profileImage"),uploadToCloudinary, updateProfile)
router.post("/imageupload" ,upload.single("file") ,uploadToCloudinary ,imageupload )


module.exports = router;