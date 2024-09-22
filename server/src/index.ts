import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { createAPI } from "./api";
import { closePool } from "./db";

async function startServer() {
  const app = express();

  const PORT = process.env.PORT || 80;

  //enable all cors requests
  app.use(cors("*"));
  app.use(
    morgan(
      ":method :url :status :res[content-length] - :response-time ms, :date[web]"
    )
  );

  //gzip responses
  app.use(compression());
  app.use(express.json({ limit: "25mb" }));

  await createAPI(app);

  await new Promise((res) => app.listen(PORT, () => res));

  console.log("App is running at http://localhost:%d", PORT);

  process.on("SIGTERM", async () => {
    await closePool();
  });

  return { app };
}

startServer();
