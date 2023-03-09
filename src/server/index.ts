import express, {Express, Request, Response} from "express";
import {RequestHandler} from "express-serve-static-core";
import {getWordFromDictionary} from './services/rae/rae.service';
import cors from 'cors';

const app: Express = express();

app.use(express.urlencoded({ extended: true }) as RequestHandler);

app.use(cors({
  origin: '*'
}));
app.use(express.json() as RequestHandler);

const port: number = Number(process.env.PORT) || 8050; // set our port

// Send index.html on root request
app.use(express.static("dist"));
app.get("/", (req: Request, res: Response) => {
  console.log("sending index.html");
  res.sendFile("/dist/index.html");
});

app.post("/api/search", async (req, res) => {
  const {search} = req.body;
  console.log(req.body)
  if (search) {
    const words = await getWordFromDictionary(search);
    return res.send(words);
  }
  res.status(400).send('body parameter search can not be empty');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
