import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import helmet from "helmet";
import * as morgan from "morgan";
import * as favicon from "serve-favicon";
import * as path from "path";
import routes from "./routes/";

createConnection()
  .then(async () => {
    // create express app
    const app = express();

    //Settings
    app.set("port", process.env.PORT || 3001);

    //Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan("dev"));
    app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
    app.use(cors());
    app.use(helmet());

    // Routes
    app.use("/", routes);
    
    // Starting the server
    app.listen(app.get("port"), () => {
      console.log(
        `🚀 Server running on port:, http://localhost:${app.get("port")}`
      );
    });
  })
  .catch((error) => console.log(error));
