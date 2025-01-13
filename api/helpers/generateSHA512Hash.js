import crypto from "crypto"

export default function generateSHA512Hash(input) {
  return crypto.createHash("sha512").update(input).digest("hex")
}
