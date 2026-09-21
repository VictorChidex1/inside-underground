import * as React from 'react'

export interface DecryptedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string
  speed?: number
  maxIterations?: number
  characters?: string
  triggerOnHover?: boolean
  className?: string
}

const DEFAULT_CHARS = '0123456789ABCDEF_#$@%*&~<>/!?'

export function DecryptedText({
  text,
  speed = 35,
  maxIterations = 8,
  characters = DEFAULT_CHARS,
  triggerOnHover = true,
  className = '',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = React.useState(text)
  const isScramblingRef = React.useRef(false)

  const runScramble = React.useCallback(() => {
    if (isScramblingRef.current) return
    isScramblingRef.current = true

    let iteration = 0
    const totalLength = text.length

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < Math.floor((iteration / maxIterations) * totalLength)) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )

      iteration += 1

      if (iteration > maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        isScramblingRef.current = false
      }
    }, speed)

    return () => {
      clearInterval(interval)
      isScramblingRef.current = false
    }
  }, [text, speed, maxIterations, characters])

  // Initial scramble on mount
  React.useEffect(() => {
    const cleanup = runScramble()
    return cleanup
  }, [runScramble])

  return (
    <span
      onMouseEnter={() => {
        if (triggerOnHover) runScramble()
      }}
      className={`inline-block font-mono select-none cursor-default ${className}`}
      {...props}
    >
      {displayText}
    </span>
  )
}
