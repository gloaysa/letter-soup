import express, { Express } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import cors from 'cors';
import { wordsRouter } from './routes/words.route';
import connectToDB from './db';
import path from 'path';

const app: Express = express();
connectToDB();

app.use(express.urlencoded({ extended: true }) as RequestHandler);

app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json() as RequestHandler);

const port: number = Number(process.env.PORT) || 5050; // set our port
const CLIENT_PATH = '/dist';

// Send index.html on root request
app.use(express.static(path.resolve('./') + `${CLIENT_PATH}/public`));
app.use(express.static(path.resolve('./') + `${CLIENT_PATH}/assets`));
app.get('/', (req, res): void => {
	res.sendFile(path.resolve('./') + `${CLIENT_PATH}/public/index.html`);
});

app.use('/api', wordsRouter);

app.get('*', (req, res) => {
	res.sendFile(path.resolve('./') + `${CLIENT_PATH}/public/index.html`);
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
