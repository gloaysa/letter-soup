import { Router } from 'express';
import { WordsService } from '../services/words/words.service';
import { wordList } from '../../common/word-list';

const router = Router();
const wordService = new WordsService();

router.get('/words/all', async (req, res) => {
	console.info('All words requested');
	const allWords = await wordService.getAllWords();
	if (!allWords) {
		return res.status(500).send('Server could not retrieve all the words');
	}
	res.send(allWords);
});
router.post('/words/search', async (req, res) => {
	const { search, create } = req.body;
	console.info(`Search for word ${search}. Create: ${create}`);
	if (!search) {
		return res.status(400).send({ error: 'body parameter search can not be empty' });
	}
	const word = create ? await wordService.getWordByValueOrCreate(search) : await wordService.getWordByValue(search);
	if (!word) {
		return res.status(404).send({ error: `Word ${search} not found!` });
	}

	return res.send(word);
});

router.post('/words/rae', async (req, res) => {
	const { search } = req.body;
	console.info(`Search in RAE for word ${search}`);
	if (!search) {
		return res.status(400).send('body parameter search can not be empty');
	}
	const word = await wordService.searchWordInRAE(search);
	if (!word) {
		return res.status(200).send(`Word ${search} not found!`);
	}

	return res.send(word);
});

router.get('/words/import', async (req, res) => {
	const date = new Date().toISOString();
	console.info(`Import requested. Processing the data...`);
	res.status(202).send('Import requested. Processing the data...');
	let count = 0;

	console.debug(`Processing ${wordList.length} words...`);
	for (const word of wordList) {
		await wordService.getWordByValueOrCreate(word);
		count += 1;
		console.debug(`Processed word ${word} ${count}/${wordList.length}`);
	}
	console.info(`Import requested at ${date} has finished.`);
});

export { router as wordsRouter };
