import User from "../model/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {

    const { gender, password, userName, fullName } = req.body;
    console.log(req.body)
    if (!gender || !password || !userName || !fullName) {
        return res.status(400).json({ success: false, message: "all fields are required" });
    }
    try {
        const avatar = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({ gender, profilePhoto: avatar, password: hashedPassword, userName, fullName });
        res.status(201).json({ success: true, message: "Registration Success", data })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" })
        console.log(error);
    }
}


export const login = async (req, res) => {

    const { password, userName } = req.body;

    if (!password || !userName) {
        return res.status(400).json({ success: false, message: "username and password is required" });
    }

    try {
        const userMatch = await User.findOne({ userName });
        if (!userMatch) {
            return res.status(404).json({ success: false, message: "invalid credentials" });
        }
        const passMatch = await bcrypt.compare(password, userMatch.password);
        if (!passMatch) {
            return res.status(404).json({ success: false, message: "invalid credentials" });
        }
        const token = jwt.sign({ _id: userMatch._id }, process.env.JWTSECRET, { expiresIn: "1d" });
        res.status(201).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict'

        }).json({
            success: true, message: "Login Success", user: {
                _id: userMatch._id,
                userName: userMatch.userName,
                fullName: userMatch.fullName,
                profilePhoto: userMatch.profilePhoto
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" })
        console.log(error);
    }
}


export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ success: true, message: "logout success" })
    } catch (error) {
        console.log(error)
    }
}


export const getRegisteredUser = async (req, res) => {
    try {
        const loggedInUser = req.id;
        const result = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        return res.status(200).json({ success: true, result });
    } catch (error) {

    }
}