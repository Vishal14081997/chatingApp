const express= require("express")
const {signUp ,login ,getProfile ,getAllContacts} = require("../controllers/auth.controller")
const verifyToken = require("../middleware/verifyToken.middleware")

const router = express.Router()

router.post("/signup" , signUp)
router.post("/login" , login)
router.get("/getProfile" ,verifyToken,  getProfile)
router.get("/getAllContacts" ,verifyToken,  getAllContacts)


module.exports = router;