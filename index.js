import express from "express";
import cors from "cors";
import router from "./Routers/booking.router.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/", router);



app.listen(port, () => {
  console.log("app is running", port);
});
