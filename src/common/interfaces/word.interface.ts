
export interface IWord {
    value: string;
    spellings: {
        _id: string;
        value: string;
    }[];
    _id: string;
    definitions: string[];
}
