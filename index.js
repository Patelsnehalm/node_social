const expres = require("express")
const app = expres();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

mongoose.connect('mongodb://127.0.0.1:27017/lama');

//middleware
app.use(expres.json());
app.use(helmet());
app.use(morgan("common"))


app.use("/abc", (req, res) => {
    res.send("Data from server")
}
)

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(8088, () => {

    console.log("Server is running!!")
})