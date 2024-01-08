import React from 'react'

type Props = {
    language: 'ru' | 'en';
    okKeys: Array<string>;
    usedKeys: Array<string>;
    onLetter: (value: string) => void;
    onBackspace: () => void;
    onEnter: () => void;
}

export const Keyboard = ({
    language,
    okKeys,
    usedKeys,
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

    const getKeyStyle = ({ isOk, isUsed }: { isOk: boolean; isUsed: boolean; }): React.CSSProperties => ({
        ...isOk ? { backgroundColor: '#ddd', color: '#5d2' } : {},
        ...isUsed ? { backgroundColor: '#ddd', color: '#888' } : {},
    })

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {keys.map((row, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                    {row.map((key) => {
                        if (key === KEY_BACKSPACE) {
                            return (<button key={key} onClick={onBackspace}>&lt; &times;</button>)
                        }

                        if (key === KEY_ENTER) {
                            return (<button key={key} onClick={onEnter}>OK</button>)
                        }

                        return (
                            <button
                                key={key}
                                onClick={() => { onLetter(key) }}
                                style={getKeyStyle({
                                    isOk: okKeys.includes(key),
                                    isUsed: usedKeys.includes(key),
                                })}
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
