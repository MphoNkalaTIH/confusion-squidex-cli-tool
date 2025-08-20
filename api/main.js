import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

// files routes
app.get("/files/get-all-files", ( req, res) => {res.status(200).send("OK")});
app.get("/files/get-specific-file", ( req, res) => {res.status(200).send("OK")});
app.port("/files/merge-files", (req, res) => {res.status(200).send("OK")});

// squidex routes
app.delete("/squidex/delete-content", (req, res) => {res.status(200).send("OK")});
app.get("/squidex/fetch-content", (req, res) => {res.status (200).send("OK")});
app.put("/squidex/update-content", (req, res) => {res.status (200).send("OK")});