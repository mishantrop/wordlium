import React from 'react'

import * as styles from './keyboard.module.css'

type Props = {
    language: 'ru' | 'en';
    okKeys: Array<string>;
    errorKeys: Array<string>;
    wrongPlaceKeys: Array<string>;
    onLetter: (value: string) => void;
    onBackspace: () => void;
    onEnter: () => void;
}

export const Keyboard = ({
    language,
    okKeys,
    errorKeys,
    wrongPlaceKeys,
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
            ['z', 'x', 'c', 'v', 'b', 'n', 'm', KEY_BACKSPACE, KEY_ENTER],
        ],
        ru: [
            ['ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
            ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
            ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', KEY_BACKSPACE, KEY_ENTER],
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
                                    &lt; &times;
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
                                    OK
                                </button>
                            )
                        }

                        return (
                            <button
                                key={key}
                                onClick={() => { onLetter(key) }}
                                className={[
                                    styles.key,
                                    okKeys.includes(key) ? styles.keyFullMatch : undefined,
                                    errorKeys.includes(key) ? styles.keyError : undefined,
                                    wrongPlaceKeys.includes(key) ? styles.keyWrongPlace : undefined,
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
