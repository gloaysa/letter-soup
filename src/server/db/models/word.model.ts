import mongoose, {Document} from 'mongoose';
import {IWord} from '../../../common/interfaces/word.interface';

const wordSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        lowercase: true,
        index: {
            unique: true,
        }
    },
    _id: {
        type: String,
        required: true,
    },
    spellings: {
        type: [{
            _id: String,
            value: String,
        }],
        required: true,
    },
    definitions: {
        type: [String],
        required: true,
    },
});

wordSchema.index({value: 'text'})

export const WordDocument = mongoose.model('Word', wordSchema);

const WordModel = (word: IWord): Document<IWord> => {
    return new WordDocument(word);
}

export default WordModel;
