const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "user already exist" });
        }
        const newUser = await User.create({
            fullName,
            email,
            password,
        });
        res.status(201).json({
            message: "Account create successfully",
            data: newUser,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "password is increate" });
        }
        const payload = {
            userId: user._id,
            fullName: user.fullName,
            email: user.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });

        res.status(200).json({
            message: "login successfully",
            data: { user, token },
        });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
};
const googleLogin = async (req, res) => {
    try {
        const { email, fullName, profilePic, googleId } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email, fullName, profilePic, googleId
            })
        } else {
            user.fullName = fullName;
            user.profilePic = profilePic;
            user.googleId = googleId
            await user.save()
        }
        const payload = {
            userId: user._id,
            fullName: user.fullName,
            email: user.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });

        res.status(200).json({
            message: "login successfully",
            data: { user, token },
        });
    } catch (error) {
        console.log("google login error", error);
        res.status(500).json({ message: "server error" })
    }
};
const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const getUser = await User.findById(userId).select("-password");
        res.status(200).json({
            message: " Get Profile",
            user: getUser
        });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
};
const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id

        const updateData = { ...req.body }

        if (req.fullName) {
            updateData.fullName = req.body.fullName
        }
        if (req.email) {
            updateData.email = req.body.email
        }
        console.log("image url", req.imageUrl);

        if (req.imageUrl) {
            updateData.profilePic = req.imageUrl[0]
        }
        const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true })

        res.status(200).json({
            message: "Profile update successfully",
            data: updateUser
        })
    } catch (error) {

    }
}
const getAllContacts = async (req, res) => {
    try {
        const logingUserId = req.user._id;
        const query = { _id: { $ne: logingUserId } }
        const user = await User.find(query)

        res.status(200).json({
            message: "get all contacts list",
            data: user
        })
    } catch (error) {

    }
}
const imageupload = async (req, res) => {
    try {
        console.log(req.file)

        res.status(200).json({
            message: "image upload",
            file: req.file,
            image: req.imageUrl
        })
    } catch (error) {

    }
}


module.exports = { signUp, login, getProfile, getAllContacts, updateProfile, imageupload, googleLogin };
