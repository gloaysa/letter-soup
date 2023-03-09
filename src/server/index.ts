import express, {Express, Request, Response} from "express";
import {RequestHandler} from "express-serve-static-core";
import cors from 'cors';
import {wordsRouter} from './routes/words.route';
import connectToDB from './db';

const app: Express = express();
connectToDB();

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

app.use('/api', wordsRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
