export interface Letter {
    key: string;
    state?: 'ok-position' | 'ok-exists';
}

export type Word = Array<Letter>
