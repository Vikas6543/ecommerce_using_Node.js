const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

// config env
dotenv.config();

// MongoDB Connection
const connect_DB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (err) {
        console.log(err);
    }
};

connect_DB();

// Init Middleware
app.use(express.json({ extended: false }));

// cors
app.use(cors());

// Routes
app.use("/user", require("./routes/UserRoute"));
app.use("/product", require("./routes/ProductRoute"));

// app listen
const PORT = process.env.PORT || "5000";
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
