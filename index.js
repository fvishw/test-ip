import express from "express";
import 'dotenv/config'

const app = express();

app.get("/", (req, res) => {
  try {
    const forwarded = req.headers["x-forwarded-for"];
    const ip =
      typeof forwarded === "string"
        ? forwarded.split(",")[0]
        : req.socket.remoteAddress || req.ip;

    return res.send(ip)
  } catch (error) {
    res.status(400).json({
        message:"something went wrong"
    })
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on ${process.env.PORT}`);
});
