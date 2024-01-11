export interface Letter {
    key: string;
    state: 'ok' | 'near' | undefined;
}

export type Word = Array<Letter>
