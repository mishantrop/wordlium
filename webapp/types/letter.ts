export interface WordLetter {
    key: string;
    state: 'ok' | 'near' | 'error' | undefined;
}

export type Word = Array<WordLetter>
