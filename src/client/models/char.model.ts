export const Chars = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
] as const;

export type Char = (typeof Chars)[number];

export interface IChar {
    value: Char;
}
export class CharModel {
    value: Char;

    constructor(value: Char) {
        this.value = value;
    }
}
