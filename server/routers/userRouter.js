const router = require("express").Router()
const User = require("../models/userModel")

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body

    //vallidation
    if (!email || !password || !passwordVerify) return res.status(400).json({ errorMessage: "Please enter all required fields" })

    if (password.length < 6) return res.status(400).json({ errorMessage: "Please enter password with longer than 6 characters" })

    if (password !== passwordVerify) return res.status(400).json({ errorMessage: "Password and verify password are not the same" })

    const existingUser = await User.findOne({ email })

    if (existingUser) return res.status(400).json({ errorMessage: "An account with this email already exists" })
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

module.exports = router
