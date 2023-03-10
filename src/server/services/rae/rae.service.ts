import { RAE } from "rae-api";
import { IWord } from "../../../common/interfaces/word.interface";

const rae = new RAE();

export async function getDefinitionsFromDictionary(
  id: string
): Promise<string[]> {
  try {
    const word = await rae.fetchWord(id);
    return word
      .getDefinitions()
      .map((definition) => definition.getDefinition());
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getWordFromDictionary(
  search: string
): Promise<IWord | undefined> {
  try {
    const results = await rae.searchWord(search);
    if (!results.isOk() || !results.getRes().length) {
      return undefined;
    }
    const words: IWord[] = await Promise.all(
      results.getRes().map(async (word) => {
        const multipleGenres = word.getHeader().split(",");
        let fixedGenre;
        if (multipleGenres.length > 1) {
          const mainWord = multipleGenres[0];
          fixedGenre = multipleGenres.map((spelling) => {
            if (spelling === mainWord) {
              return spelling;
            }
            const a = mainWord.slice(0, mainWord.length - (spelling.length - 1));
            return a.concat(spelling.trim());
          });
        }
        return {
          value: fixedGenre ? fixedGenre[0] : word.getHeader(),
          language: "es",
          _id: word.getId(),
          genres: fixedGenre ?? [],
          spellings: [],
          definitions: await getDefinitionsFromDictionary(word.getId()),
        };
      })
    );

    return words
      .filter(({ value }) => value === search)
      .reduce((previousValue, currentValue, currentIndex): IWord => {
        const currentId = currentValue?._id;
        const previousSpellings = previousValue.spellings;
        const previousDefinitions = previousValue.definitions;
        const isFirstIteration = currentIndex === 0;
        return {
          value: previousValue.value,
          _id: previousValue._id,
          language: "es",
          genres: isFirstIteration ? previousValue.genres : [...previousValue.genres, ...currentValue.genres],
          spellings: isFirstIteration ? previousSpellings : [
            ...previousSpellings,
            { value: currentValue.value, _id: currentId },
          ],
          definitions: isFirstIteration ? previousDefinitions : [...previousDefinitions, ...currentValue.definitions],
        };
      }, words[0]);
  } catch (e) {
    console.error(
      `There as a problem looking for the word ${search} in the dictionary: ${e}`
    );
    return undefined;
  }
}
