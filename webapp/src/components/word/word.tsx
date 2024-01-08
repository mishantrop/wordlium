import React from 'react'

import { Letter } from '../../types/letter'

type Props = {
  letters: Array<Letter>;
}

export const Word = ({
  letters,
}: Props) => {
  const cssRound: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
  }
  const cssLetter: React.CSSProperties = {
    border: '1px solid #666',
    borderRadius: '4px',
    height: '32px',
    width: '32px',
    padding: '4px',
  }

  return (
    <div style={cssRound}>
      {letters.map((letter, letterIdx) => {
        return (
          <div
            style={cssLetter}
            key={letterIdx}
          >
            {letter.key}
          </div>
        )
      })}
    </div>
  )
}
