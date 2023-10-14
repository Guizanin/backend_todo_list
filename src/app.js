import express from "express";
import { MOCK_TODOES } from "../constants.js";
import { indexId, lowerCase } from "./utils.js";

const app = express();
app.use(express.json());

app.get("/todo", (req, res) => {
  res.status(200).json(MOCK_TODOES);
});

app.get("/todo/:description", (req, res) => {
  const { params: { description: queryDesc } = false } = req;

  if (!queryDesc || !queryDesc.length) {
    res.status(200).json(MOCK_TODOES);
    return;
  } else {
    const returned = MOCK_TODOES.filter((finded) =>
      lowerCase(finded.description).includes(lowerCase(queryDesc))
    );

    returned.length
      ? res.status(200).json(returned)
      : res.status(200).json(MOCK_TODOES);
    return;
  }
});

app.post("/todo", (req, res) => {
  MOCK_TODOES.push(req.body);
  res
    .status(201)
    .send(`Objeto criado com sucesso, ${JSON.stringify(req.body)}`);
});

app.put("/todo/:id", (req, res) => {
  const { params: { id: queryId } = false } = req;
  const returnedIndex = indexId(queryId);
  const findedObject = MOCK_TODOES[returnedIndex];

  MOCK_TODOES[returnedIndex] = {
    ...findedObject,
    ...req.body,
  };

  res.status(200).send(`objeto ID: ${queryId} atualizado com sucesso.`);
});

app.delete("/todo/:id", (req, res) => {
  const { params: { id: queryId } = false } = req;
  const returnedIndex = indexId(queryId);

  MOCK_TODOES.splice(returnedIndex, 1);

  res.status(200).send(`Objeto ID: ${queryId} deletado com sucesso`);
});

export default app;
