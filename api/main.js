import express from 'express';

import { fetchSquidexContent } from "./services/squidex/fetch-content.service.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

// files routes
app.get("/files/get-all-files", ( req, res) =>  {res.status(200).send("OK")});
app.get("/files/get-specific-file", ( req, res) => {res.status(200).send("OK")});
app.put("/files/merge-files", (req, res) => {res.status(200).send("OK")});

// squidex routes
app.delete("/squidex/delete-content", (req, res) => {res.status(200).send("OK")});
app.get("/squidex/fetch-content", (req, res) => {
  const params = req.query;
  
  fetchSquidexContent(params.app, params.schema);
  {res.status (200).send("OK")}}
);
app.put("/squidex/update-content", (req, res) => {res.status (200).send("OK")});