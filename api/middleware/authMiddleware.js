import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization
  try {
    if (!token) return res.status(401).send("Unauthorized")
    if (!token.startsWith("Bearer")) return res.status(401).send("Unauthorized")

    token = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.id = decoded.id
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ messasge: "Invalid token" })
  }
}
