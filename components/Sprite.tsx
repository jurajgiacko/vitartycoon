import React from 'react'

// Pixel-art renderer: mapa znaků -> barvy, vykresleno přes box-shadow.
export function Sprite({
  map,
  palette,
  px = 6,
  className,
}: {
  map: string[]
  palette: Record<string, string>
  px?: number
  className?: string
}) {
  const shadows: string[] = []
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = palette[row[x]]
      if (c) shadows.push(`${(x + 1) * px}px ${(y + 1) * px}px 0 0 ${c}`)
    }
  })
  const cols = Math.max(...map.map((r) => r.length))
  return (
    <div
      className={className}
      style={{
        width: cols * px,
        height: map.length * px,
        position: 'relative',
        overflow: 'visible',
      }}
      aria-hidden
    >
      <div
        style={{
          position: 'absolute',
          top: -px,
          left: -px,
          width: px,
          height: px,
          boxShadow: shadows.join(','),
        }}
      />
    </div>
  )
}

const K = '#1a1a1a'
const W = '#ffffff'

export const PALETTES: Record<string, Record<string, string>> = {
  default: {
    K,
    W,
    R: '#e04f38',
    Y: '#f2c531',
    G: '#4caf50',
    B: '#4a90d9',
    P: '#f08a9b',
    S: '#c9c9c9',
    D: '#5a5a66',
  },
}

export const SPRITES: Record<string, string[]> = {
  pill: [
    '...KKKK...',
    '..KWWWWK..',
    '..KWWWWK..',
    '..KWWWWK..',
    '..KWWWWK..',
    '..KRRRRK..',
    '..KRRRRK..',
    '..KRRRRK..',
    '..KRRRRK..',
    '...KKKK...',
  ],
  phone: [
    '..KKKKKK..',
    '.KWWWWWWK.',
    '.KWBBBBWK.',
    '.KWBBBBWK.',
    '.KWBBBBWK.',
    '.KWBBBBWK.',
    '.KWBBBBWK.',
    '.KWWWWWWK.',
    '.KW.KK.WK.',
    '..KKKKKK..',
  ],
  box: [
    '.KKKKKKKK.',
    '.KYYKKYYK.',
    '.KYYKKYYK.',
    '.KYYYYYYK.',
    '.KYYYYYYK.',
    '.KYYYYYYK.',
    '.KYYYYYYK.',
    '.KKKKKKKK.',
  ],
  star: [
    '....YY....',
    '....YY....',
    '...YYYY...',
    'YYYYYYYYYY',
    '.YYYYYYYY.',
    '..YYYYYY..',
    '..YY..YY..',
    '.YY....YY.',
  ],
  heart: [
    '.KK...KK..',
    'KRRK.KRRK.',
    'KRRRKRRRK.',
    'KRRRRRRRK.',
    '.KRRRRRK..',
    '..KRRRK...',
    '...KRK....',
    '....K.....',
  ],
  chart: [
    '..........',
    '.......BB.',
    '.......BB.',
    '....GG.BB.',
    '....GG.BB.',
    '.RR.GG.BB.',
    '.RR.GG.BB.',
    'KKKKKKKKKK',
  ],
  flag: [
    '.K........',
    '.KRRRRRR..',
    '.KRRRRRR..',
    '.KRRRR....',
    '.K........',
    '.K........',
    '.K........',
    '.K........',
  ],
  scroll: [
    '.KKKKKKK..',
    '.KWWWWWK..',
    '.KWKKKWK..',
    '.KWWWWWK..',
    '.KWKKWWK..',
    '.KWWWWWK..',
    '.KWKKKWK..',
    '.KKKKKKK..',
  ],
  euro: [
    '..KKKK..',
    '.KYYYYK.',
    'KYYYYYYK',
    'KYKKKYYK',
    'KYYKYYYK',
    'KYKKKYYK',
    '.KYYYYK.',
    '..KKKK..',
  ],
  mega: [
    '......KK..',
    '....KKRK..',
    '..KKRRRK..',
    'KKRRRRRK..',
    'KRRRRRRK..',
    'KKRRRRRK..',
    '..KKRRRK..',
    '..K.KKRK..',
    '..KK..KK..',
  ],
  factory: [
    '.K...K....',
    '.K...K....',
    '.KKKKKKKK.',
    '.KGGKGGKK.',
    '.KKKKKKKK.',
    '.KGGKGGKK.',
    '.KKKKKKKK.',
  ],
  leaf: [
    '......GG..',
    '....GGGG..',
    '..GGGGGG..',
    '.GGGGGGG..',
    '.GGGGGG...',
    '.GGGGG....',
    '..GG......',
    '.K........',
  ],
  robot: [
    '...KK.....',
    '..KKKK....',
    '.KSSSSK...',
    '.KSBSBSK..',
    '.KSSSSK...',
    '..KKKK....',
    '.KSSSSK...',
    '.K.KK.K...',
  ],
  cloud: [
    '....KKKK......',
    '..KKWWWWKK....',
    '.KWWWWWWWWK...',
    'KWWWWWWWWWWKK.',
    'KWWWWWWWWWWWWK',
    '.KKKKKKKKKKKK.',
  ],
  unicorn: [
    '........KK............',
    '.......KYYK...........',
    '......KYYK............',
    '.....KWWK.............',
    '.....KYYK.............',
    '....KWWK.KKK..........',
    '....KKKKKKPPPK........',
    '...KWWWWWWKPPPK.......',
    '..KWWWWWWWWKPPPK......',
    '..KWKKKKKKWWKPPPK.....',
    '..KWKKKKKKWWWKPPK.....',
    'KKKWWWWWWWWWWKPPPK....',
    'KWWWWWWWWWWWWWKPPK....',
    'KWKKWWWWWWWWWWKPPK....',
    'KWWWWWWWWWWWWWKPK.....',
    '.KKKKKWWWWWWWWKK......',
    '.....KWWWWWWWWK.......',
    '.....KWGGGGGGWK.......',
    '......KGGGGGGK........',
    '.......KKKKKK.........',
  ],
  skull: [
    '..KKKKK..',
    '.KWWWWWK.',
    'KWWWWWWWK',
    'KWKKWKKWK',
    'KWKKWKKWK',
    'KWWWKWWWK',
    '.KWWWWWK.',
    '.KWKWKWK.',
    '.KKKKKKK.',
  ],
  trophy: [
    '.KKKKKKK.',
    'KKYYYYYKK',
    'KYKYYYKYK',
    'KYKYYYKYK',
    '.KKYYYKK.',
    '..KYYYK..',
    '...KYK...',
    '...KYK...',
    '.KKYYYKK.',
    '.KYYYYYK.',
    '.KKKKKKK.',
  ],
  faceHappy: [
    '..KKKK..',
    '.KYYYYK.',
    'KYKYYKYK',
    'KYYYYYYK',
    'KYKYYKYK',
    '.KYKKYK.',
    '..KKKK..',
  ],
  faceMid: [
    '..KKKK..',
    '.KYYYYK.',
    'KYKYYKYK',
    'KYYYYYYK',
    'KYKKKKYK',
    '.KYYYYK.',
    '..KKKK..',
  ],
  faceSad: [
    '..KKKK..',
    '.KYYYYK.',
    'KYKYYKYK',
    'KYYYYYYK',
    'KYYKKYYK',
    '.KYKKYK.',
    '..KKKK..',
  ],
}
