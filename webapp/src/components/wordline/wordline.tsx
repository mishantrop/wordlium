import React from 'react'

import { Letter } from '../../types/letter'

type Props = {
    currentLetterIdx?: number;
    letters: Array<Letter>;
    targetWord?: Array<Letter>;
}

export const WordLine = ({
    currentLetterIdx,
    letters,
    targetWord,
}: Props) => {
    const cssRound: React.CSSProperties = {
        display: 'flex',
        gap: '4px',
    }


    const getLetterStyles = ({
        isOkPlace,
        isCurrent,
    }: {
        isOkPlace: boolean;
        isCurrent: boolean;
    }): React.CSSProperties => {
        return {
            border: '1px solid #666',
            borderRadius: '4px',
            height: '32px',
            width: '32px',
            padding: '4px',

            ...isOkPlace ? { color: '#2d4' } : {},
            ...isCurrent ? { border: '1px solid #26d' } : {},
        }
    }

    return (
        <div style={cssRound}>
            {letters.map((letter, letterIdx) => {
                return (
                    <div
                        style={getLetterStyles({
                            isOkPlace: targetWord?.[letterIdx] ? letter.key === targetWord[letterIdx].key : false,
                            isCurrent: letterIdx === currentLetterIdx,
                        })}
                        key={letterIdx}
                    >
                        {letter.key}
                    </div>
                )
            })}
        </div>
    )
}
