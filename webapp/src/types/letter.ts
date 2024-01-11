export interface Letter {
    key: string;
    state: 'ok' | 'near' | 'error' | undefined;
}

export type Word = Array<Letter>
