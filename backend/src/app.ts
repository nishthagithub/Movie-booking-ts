import express from "express"
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import userRoutes from "./Routes/UserRoutes";
import cityRoute from "./Routes/cityRoute"
import cors from "cors"
import protectedRoute from "./Routes/ProtectedRoute"
import cookieParser from "cookie-parser";
import movieRoutes from "./Routes/movieRoutes"
import theaterRoutes from "./Routes/theaterRoute"
import slotTypeRoutes from "./Routes/slotTypeRoutes";
import dayRoute from "./Routes/dayRoute"
import slotDataRoutes from "./Routes/SlotDataRoutes";
import seatRoute from "./Routes/seatRoute"
import stripeRoute from "./Routes/stripeRoute"
import bookingRoute from "./Routes/BookingRoute"
import newsRoutes from "./Routes/NewsRoute"
import dotenv from "dotenv";
import fileupload from "express-fileupload"
import { handleStripeWebhook } from "./controllers/webhookController";

 dotenv.config();
const PORT = process.env.PORT || 8080;
// console.log(port)
const app = express();
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }), // Important for verifying signature
  handleStripeWebhook
);
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({
    extended: true
}))
app.use(fileupload({
  useTempFiles:true
}));
app.use(cookieParser());
const fronturl = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: fronturl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);
app.use("/api",protectedRoute)
app.use("/api/user", userRoutes);
app.use("/api/movie",movieRoutes);
app.use("/api/city",cityRoute);
app.use("/api/theater",theaterRoutes);
app.use("/api/slottype", slotTypeRoutes);
app.use("/api/slot", slotDataRoutes);
app.use("/api/day",dayRoute);
app.use("/api/seats",seatRoute);
app.use("/api/stripe",stripeRoute)
app.use("/api/cpay", bookingRoute);
app.use("/api/news",newsRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`App running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
  export default app;