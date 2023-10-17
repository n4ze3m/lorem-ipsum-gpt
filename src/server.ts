import express from "express";
import cors from "cors";
import {
  chatCompletionController,
  getAllModelsController,
} from "./controllers";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/v1/models", getAllModelsController);
app.post("/v1/chat/completions", chatCompletionController);

const PORT = process.env.PORT || 7431;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
