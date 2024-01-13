import React from 'react'

import { GameLanguage } from '../../Game'

import * as styles from './keyboard.module.css'

type Props = {
    language: GameLanguage;
    okKeys: Array<string>;
    errorKeys: Array<string>;
    nearKeys: Array<string>;
    onLetter: (value: string) => void;
    onBackspace: () => void;
    onEnter: () => void;
}

export const Keyboard = ({
    language,
    okKeys,
    errorKeys,
    nearKeys,
    onLetter,
    onBackspace,
    onEnter,
}: Props) => {
    const KEY_BACKSPACE = 'backspace'
    const KEY_ENTER = 'enter'
    const keysByLanguage: Record<Props['language'], Array<Array<string>>> = {
        en: [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            ['z', 'x', 'c', 'v', 'b', 'n', 'm', KEY_BACKSPACE],
            [KEY_ENTER],
        ],
        ru: [
            ['ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
            ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
            ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', KEY_BACKSPACE],
            [KEY_ENTER],
        ],
    }

    const keys = keysByLanguage[language]

    return (
        <div className={styles.keyboard}>
            {keys.map((row, idx) => (
                <div key={idx} className={styles.row}>
                    {row.map((key) => {
                        if (key === KEY_BACKSPACE) {
                            return (
                                <button
                                    key={key}
                                    className={[ styles.key ].join(' ')}
                                    onClick={onBackspace}
                                >
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 256">
                                        <g>
                                            <g>
                                                <g>
                                                    <path fill="#000000" d="M44.1,91.8L10,125.9v2.1v2.1l34.1,34.1l34.1,34.1h82c89.2,0,83.9,0.1,85.1-2.5c0.8-1.8,0.8-133.8,0-135.6c-1.2-2.7,4.1-2.5-85.1-2.5h-82L44.1,91.8z M236.2,128v60.6h-76.9H82.4l-30.3-30.3L21.8,128l30.3-30.3l30.3-30.3h76.9h76.9V128z"/>
                                                    <path fill="#000000" d="M111.3,91.4c-1.3,1.2-1.6,1.7-1.6,3.5V97l15.5,15.5l15.5,15.5l-15.4,15.4c-13,13-15.4,15.6-15.6,17c-0.6,3.5,3.4,6.5,6.6,5.1c0.7-0.3,8.1-7.3,16.3-15.5l15-15l15.5,15.5c14.2,14.1,15.7,15.5,17.1,15.5c3.1,0,5.1-2.1,5.1-5.5c0-1.6-0.8-2.5-15.4-17.1L154.6,128l15.4-15.4l15.4-15.4v-2c0-3.1-2-5.1-5.2-5.1c-1.3,0-3,1.4-17,15.5l-15.5,15.5l-15.3-15.3c-14.9-14.9-15.4-15.3-17.4-15.5C113.1,90,112.7,90.1,111.3,91.4z"/>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            )
                        }

                        if (key === KEY_ENTER) {
                            return (
                                <button
                                    key={key}
                                    className={[ styles.key ].join(' ')}
                                    onClick={onEnter}
                                >
                                    <svg width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M864 192c-19.2 0-32 12.8-32 32v224c0 89.6-70.4 160-160 160H236.8l105.6-105.6c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0l-160 160c-3.2 3.2-6.4 6.4-6.4 9.6-3.2 6.4-3.2 16 0 25.6 3.2 3.2 3.2 6.4 6.4 9.6l160 160c6.4 6.4 12.8 9.6 22.4 9.6s16-3.2 22.4-9.6c12.8-12.8 12.8-32 0-44.8L236.8 672H672c124.8 0 224-99.2 224-224V224c0-19.2-12.8-32-32-32z"  />
                                    </svg>

                                    Проверить слово
                                </button>
                            )
                        }

                        return (
                            <button
                                key={key}
                                onClick={() => { onLetter(key) }}
                                className={[
                                    styles.key,
                                    okKeys.includes(key) ? styles.keyOk : undefined,
                                    errorKeys.includes(key) ? styles.keyError : undefined,
                                    nearKeys.includes(key) ? styles.keyNear : undefined,
                                ].join(' ')}
                            >
                                {key}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
