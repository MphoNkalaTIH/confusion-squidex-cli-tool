import express, { Request, Response } from 'express';
import { fetchSquidexContent } from "./services/squidex/fetch-content.service.ts";

const app = express();
const PORT = process.env.PORT || 3000;

// files routes
app.get("/files/get-all-files", ( req: Request, res: Response) =>  {res.status(200).send("OK")});
app.get("/files/get-specific-file", ( req: Request, res: Response) => {res.status(200).send("OK")});
app.put("/files/merge-files", (req: Request, res: Response) => {res.status(200).send("OK")});

// squidex routes
app.delete("/squidex/delete-content", (req: Request, res: Response) => {res.status(200).send("OK")});
app.get("/squidex/fetch-content", async (req: Request, res: Response) => {
  const params = req.query;
  
  await fetchSquidexContent(params.app, params.schema);
  
  res.status(200).send("OK");
});
app.put("/squidex/update-content", (req: Request, res: Response) => {res.status (200).send("OK")});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});