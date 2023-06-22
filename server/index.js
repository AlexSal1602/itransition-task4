const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

dotenv.config()

// set up server
const app = express()
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("serveria")
})

app.use(express.json())
app.use(cookieParser())

// connect to mongodb
mongoose.set("strictQuery", false)
mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) return console.error(err)
    console.log("Connected to mongoDB")
  }
)

//set up routes
app.use("/auth", require("./routers/userRouter"))
app.use("/customer", require("./routers/customerRouter"))
