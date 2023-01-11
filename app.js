const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvent");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const rootRouter = require("./routes/root");
const employeeRouter = require("./routes/api/employees");
const notFoundPage = require("./routes/404");
const Register = require("./routes/api/register");
const Login = require("./routes/api/login");
const refreshToken = require("./routes/api/refresh");
const logOut = require("./routes/api/logout");
const verifyJwt = require("./middleware/verifyJWt");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");


require("dotenv").config();

const app = express();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cookieParser());

app.use("/",express.static(path.join(__dirname,"public")));


app.use("/", rootRouter)
app.use("/register", Register)
app.use("/login", Login)
app.use("/refresh", refreshToken);
app.use("/logout", logOut);
app.use("/employees",verifyJwt, employeeRouter);

const PORT = process.env.PORT || 5000


app.all("*", notFoundPage)

app.use(errorHandler)

mongoose.set("strictQuery", false);
const serverRun = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT,() => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

serverRun();