import React from 'react'

type Props = {
  onLetter: (value: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

export const Keyboard = ({
  onLetter,
  onBackspace,
  onEnter,
}: Props) => {
  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace', 'enter'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {keys.map((row, idx) => (
        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
          {row.map((key) => {
            if (key === 'backspace') {
              return (
                <button key={key} onClick={onBackspace}>&lt; &times;</button>
              )
            }

            if (key === 'enter') {
              return (
                <button key={key} onClick={onEnter}>OK</button>
              )
            }

            return (
              <button key={key} onClick={() => { onLetter(key) }}>{key}</button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
