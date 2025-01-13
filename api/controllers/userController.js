import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const genSalt = 10
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Please enter all fields" })

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword)
      return res.status(400).json({ message: "Invalid password" })

    return res
      .status(200)
      .json({ message: "Success", token: generateToken(user._id) })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const registerUser = async (req, res) => {
  const { username, email, password, password2 } = req.body
  try {
    if (!email || !password || !password2)
      return res.status(400).json({ message: "Please enter all fields" })

    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: "Email already exists" })

    if (password != password2)
      return res
        .status(400)
        .json({ message: "Please confirm password correctly" })

    const hashPassword = bcrypt.hashSync(password, genSalt)

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    })
    return res
      .status(200)
      .json({ message: "Success", token: generateToken(newUser._id) })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}

export const verifyUser = async (req, res) => {
  let token = req.headers.authorization
  try {
    if (!token && !token.startsWith("Bearer")) {
      return res.status(401).send("Unauthorized")
    }

    token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    const user = await User.findById(decoded.id)
    if (!user) return res.status(404).json({ message: "Invalid token" })

    return res.status(200).json({ message: "Valid token" })
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: "Invalid token" })
  }
}
