import { RAE, SearchWordResponse } from "rae-api";
import { IWord } from "../../../common/interfaces/word.interface";
import { notEmpty } from "../../utils/no-empty-value";

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

    const words = await transformFromRAEtoIWord(results);
    const filteredWords = words.filter(({ value }) => search === value || searchIsPlural(search, value));

    if (!filteredWords.length) {
      return undefined;
    }

    return filteredWords
      .reduce((previousValue, currentValue, currentIndex): IWord => {
        const currentId = currentValue?._id;
        const previousSpellings = previousValue.spellings;
        const previousDefinitions = previousValue.definitions;
        const isFirstIteration = currentIndex === 0;
        return {
          value: previousValue.value,
          _id: previousValue._id,
          language: "es",
          genres: isFirstIteration
            ? previousValue.genres
            : [...previousValue.genres, ...currentValue.genres],
          plural: isFirstIteration ? previousValue.plural : currentValue.plural,
          allForms: isFirstIteration
            ? previousValue.allForms
            : currentValue.allForms,
          spellings: isFirstIteration
            ? previousSpellings
            : [
                ...previousSpellings,
                { value: currentValue.value, _id: currentId },
              ],
          definitions: isFirstIteration
            ? previousDefinitions
            : [...previousDefinitions, ...currentValue.definitions],
        };
      }, words[0]);
  } catch (e) {
    console.error(
      `There as a problem looking for the word ${search} in the dictionary: ${e}`
    );
    return undefined;
  }

  /**
   * Transforms the response returned by RAE api to an array of IWord, identifying the genres of the word
   * @param raeResponse
   */
  async function transformFromRAEtoIWord(
    raeResponse: SearchWordResponse
  ): Promise<IWord[]> {
    return Promise.all(
      raeResponse.getRes().map(async (word) => {
        const value = word.getHeader();
        const genres = identifyGenres(value) ?? [];
        const plural = generatePlural(value);
        return {
          value: genres.length ? genres[0] : value,
          language: "es",
          _id: word.getId(),
          genres,
          plural,
          allForms: removeDuplicates([value, ...genres, ...plural]),
          spellings: [],
          definitions: await getDefinitionsFromDictionary(word.getId()),
        };
      })
    );
  }

  /**
   * Generates an array with the different genres of a word returned by the RAE dictionary.
   * When a word has more than one genre will be returned with the following format: 'hijo, a'.
   * Following the previous example, this function will return ['hijo', ''hija]
   * @param word
   */
  function identifyGenres(word: string): string[] | undefined {
    const multipleGenres = word.split(",");
    let fixedGenre;
    if (multipleGenres.length > 1) {
      // Select the first element because contains the whole word, e.g: hijo;
      const mainWord = multipleGenres[0];
      fixedGenre = multipleGenres.map((spelling) => {
        if (spelling === mainWord) {
          return spelling;
        }
        const a = mainWord.slice(0, mainWord.length - (spelling.length - 1));
        return a.concat(spelling.trim());
      });
    }
    return fixedGenre;
  }

  /**
   * This function is not perfect. Follows two simple rules:
   * - If a word ends in vowel, adds an 's' at the end of the word to form the plural.
   * - If the word ends in vocal (with few exceptions) adds 'es' at the end of the word to create the plural.
   * It will cover most of the cases in Spanish, but is missing a lot of irregular words in the process.
   * @param word
   */
  function generatePlural(word: string): string[] {
    const wordPluralIsWithES = new RegExp(/^.*[^aeiougkpq]$/);
    const wordPluralIsWithS = new RegExp(/^.*[aeiou]$/);
    const hasGenre = identifyGenres(word) ?? [word];
    return hasGenre
      .map((genre) => {
        if (genre.match(wordPluralIsWithES)) {
          return `${genre}es`;
        }
        if (genre.match(wordPluralIsWithS)) {
          return `${genre}s`;
        }
        return undefined;
      })
      .filter(notEmpty);
  }

  /**
   * Returns true if the plural of the word returned by RAE can be formed the way it was searched
   * @param search executed by the user
   * @param result response from RAE
   * @example `
   * searchIsPlural(casas, casa) // will return true;
   * searchIsPlural(cases, casa) // will return false;
   * `
   */
  function searchIsPlural(search: string, result: string): boolean {
    const wordPluralIsWithES = new RegExp(/^.*[^aeiougkpq]$/);
    const wordPluralIsWithS = new RegExp(/^.*[aeiou]$/);

    // add 'es' at the end of the word when ends in vocal
    if (result.match(wordPluralIsWithES) && search.slice(-2) === "es") {
      return true;
    }
    // add an 's' to the end of the word when ends in vowel
    if (result.match(wordPluralIsWithS) && search.slice(-1) === "s") {
      return true;
    }
    return false;
  }

  function removeDuplicates(wordList: string[]): string[] {
    return wordList.filter((elem, index) => wordList.indexOf(elem) === index);
  }
}
