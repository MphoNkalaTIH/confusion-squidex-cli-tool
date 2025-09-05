import cors from 'cors';
import express, { type Request, type Response } from 'express';
import { getFolderContent, getRoot } from './services/files/get-all-files.service';
import { fetchSquidexContent } from './services/squidex/fetch-content.service';

const app = express();
const PORT = process.env['PORT'] || 3000;

// Enable CORS for all origins (customize as needed)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// files and folders routes
app.get('/files/get-root', async (req: Request, res: Response) => {
  const files = await getRoot();
  res.status(200).send(files);
});
app.get('/files/get-folder-content', async (req: Request, res: Response) => {
  const params = req.query;

  const parent = typeof params['parent'] === 'string' ? params['parent'] : undefined;
  const self = typeof params['self'] === 'string' ? params['self'] : undefined;

  console.log({ parent, self });

  const files = await getFolderContent(parent, self);

  res.status(200).send(files);
});
app.get('/files/get-specific-file', (req: Request, res: Response) => {
  res.status(200).send('OK');
});
app.put('/files/merge-files', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

// squidex routes
app.delete('/squidex/delete-content', (req: Request, res: Response) => {
  res.status(200).send('OK');
});
app.get('/squidex/fetch-content', async (req: Request, res: Response) => {
  const params = req.query;
  await fetchSquidexContent(params['app'], params['schema']);
  res.status(200).send('OK');
});
app.put('/squidex/update-content', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT);
});
