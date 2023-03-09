import {RAE} from 'rae-api';
import {IWord} from '../../../common/interfaces/word.interface';

const rae = new RAE();

export async function getDefinitionsFromDictionary(id: string): Promise<string[]> {
    try {
        const word = await rae.fetchWord(id);
        return word.getDefinitions().map((definition) => definition.getDefinition());
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getWordFromDictionary(word: string): Promise<IWord[]> {
    const results = await rae.searchWord(word);
    return Promise.all(results.getRes().map(async (word) => ({
        value: word.getHeader(),
        id: word.getId(),
        definition: await getDefinitionsFromDictionary(word.getId()),
    })));
}
