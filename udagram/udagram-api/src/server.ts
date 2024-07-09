import * as dotenv from "dotenv";
import cors from 'cors';
import express from "express";
import { sequelize } from "./sequelize";
import { IndexRouter } from "./controllers/v0/index.router";
import { V0_FEED_MODELS, V0_USER_MODELS } from "./controllers/v0/model.index";

dotenv.config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); 
  }

  await sequelize.addModels(V0_FEED_MODELS);
  await sequelize.addModels(V0_USER_MODELS);
  await sequelize.sync();

  console.log("Database Connected");

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(express.json());

  // CORS Configuration
  const allowedOrigins = ['https://user3354372-udagram.s3.amazonaws.com']; 

  app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'PATCH', 'POST', 'DELETE'], 
    credentials: true, 
  }));

  app.use("/api/v0/", IndexRouter);

  // Root URI call
  app.get("/", async (req, res) => {
    res.send("/api/v0/");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`Backend server is listening on port ${port}....`);
    console.log(`press CTRL+C to stop server`);
  });
})();
