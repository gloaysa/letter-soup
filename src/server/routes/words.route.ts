import {Router} from "express";
import {WordsService} from '../services/words/words.service';
import {wordList} from '../../common/word-list';

const router = Router();
const wordService = new WordsService();

router.post("/words/search", async (req, res) => {
  const { search } = req.body;
  if (!search) {
    res.status(400).send("body parameter search can not be empty");
  }
  const word = await wordService.getWordByValueOrCreate(search);
  if (!word) {
    res.status(200).send(`Word ${search} not found!`);
  }

  return res.send(word);

});

router.get('/words/import', async (req, res) => {
  res.status(202).send('Processing the data...');

  for (const word of wordList) {
    await wordService.getWordByValueOrCreate(word);
  }
});

export { router as wordsRouter };
