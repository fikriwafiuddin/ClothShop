import Admin from "../models/adminModel.js"
import bcrypt from "bcrypt"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" })
}

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password)
      return res
        .status(401)
        .json({ message: "Please enter both email and password" })

    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(404).json({ message: "Admin not found" })

    const comparePassword = bcrypt.compareSync(password, admin.password)
    if (!comparePassword)
      return res.status(401).json({ message: "Invalid password" })

    return res
      .status(200)
      .json({ message: "Success", token: generateToken(admin._id) })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "System error" })
  }
}
