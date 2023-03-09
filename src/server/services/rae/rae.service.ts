import {RAE} from "rae-api";
import {IWord} from "../../../common/interfaces/word.interface";

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
  word: string
): Promise<IWord | undefined> {
  try {
    const results = await rae.searchWord(word);
    if (!results.isOk() || !results.getRes().length) {
      return undefined;
    }
    const words: IWord[] = await Promise.all(
      results.getRes().map(async (word) => ({
        value: word.getHeader(),
        language: "es",
        _id: word.getId(),
        spellings: [],
        definitions: await getDefinitionsFromDictionary(word.getId()),
      }))
    );

    return words
      .filter(({ value }) => value === word)
      .reduce((previousValue, currentValue): IWord => {
        const currentId = currentValue?._id;
        const previousSpellings = previousValue.spellings;
        const previousDefinitions = previousValue.definitions;
        return {
          value: previousValue.value,
          _id: previousValue._id,
          language: "es",
          spellings: [
            ...previousSpellings,
            { value: currentValue.value, _id: currentId },
          ],
          definitions: [...previousDefinitions, ...currentValue.definitions],
        };
      }, words[0]);
  } catch (e) {
    console.error(
      `There as a problem looking for the word ${word} in the dictionary: ${e}`
    );
    return undefined;
  }
}
