import JWT from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "invalid user" });
        }
        const verifyUser = await JWT.verify(token, process.env.JWTSECRET);
        if (!verifyUser) {
            return res.status(401).json({ success: false, message: "invalid token" });
        }
        req.id = verifyUser._id;
        next();
    } catch (error) {
        console.log(error)
    }
}

export default isAuthenticated;