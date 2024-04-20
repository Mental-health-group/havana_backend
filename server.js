const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const clientAuthRoutes = require("./routes/clientAuthRoutes");
const professionalAuthRoutes = require("./routes/professionalAuthRoutes");
const clientRoutes = require("./routes/clientRoutes");
const professionalRoutes = require("./routes/professionalRoutes");
const postRoutes = require("./routes/postRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const chatRoutes = require("./routes/chatRoutes");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/api/client/auth", clientAuthRoutes);
app.use("/api/professional/auth", professionalAuthRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/professional", professionalRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/chat", chatRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = app;
