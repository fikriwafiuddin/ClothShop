import jwt from "jsonwebtoken"
import Admin from "../models/adminModel.js"

export const verifyTokenAdmin = async (req, res, next) => {
  let token = req.headers.authorization
  try {
    if (!token) return res.status(401).send("Unauthorized")
    if (!token.startsWith("Bearer")) return res.status(401).send("Unauthorized")

    token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    const admin = await Admin.findById(decoded.id).select("-password")
    if (!admin) return res.status(401).send("Invalid token")

    req.admin = admin
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: "Invalid token" })
  }
}
