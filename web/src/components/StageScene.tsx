import type { SceneKey } from '../data'

const LedText = ({ x, y, size = 30, children }: { x: number; y: number; size?: number; children: string }) => (
  <text className="s-led" x={x} y={y} fontSize={size} textAnchor="middle">{children}</text>
)

const Person = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} className="s-person">
    <circle cx="0" cy="-58" r="9" />
    <path d="M-13 0 L-11 -44 Q0 -50 11 -44 L13 0 Z" />
  </g>
)

const Platform = () => (
  <>
    <path className="s-deck" d="M90 505 H1110 L1180 545 H20 Z" />
    <path className="s-rim" d="M90 505 H1110" />
  </>
)

const Screen = ({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: React.ReactNode }) => (
  <g>
    <rect className="s-screen" x={x} y={y} width={w} height={h} rx="3" />
    {children}
  </g>
)

/** Simple silhouettes, one per event type, lit by whichever gels are selected. */
const sets: Record<SceneKey, React.ReactNode> = {
  wedding: (
    <>
      <Platform />
      <path className="s-floor" d="M90 505 H1110 L1180 545 H20 Z" />
      <path className="s-glow" d="M300 230 Q600 30 900 230 Z" />
      <path className="s-drape" d="M340 230 H470 Q440 370 362 505 H340 Z M860 230 H730 Q760 370 838 505 H860 Z" />
      <path className="s-glow" d="M430 505 V300 Q600 170 770 300 V505 Z" />
      <path className="s-frame" d="M340 505 V230 M860 505 V230 M300 230 Q600 30 900 230 Z" />
      <path className="s-frame" d="M430 505 V300 Q600 170 770 300 V505" />
      {[370, 430, 490, 550, 650, 710, 770, 830].map((x, i) => (
        <g key={x}>
          <path className="s-garland" d={`M${x} 230 v${44 + (i % 3) * 22}`} />
          <circle className="s-bloom" cx={x} cy={282 + (i % 3) * 22} r="7" />
        </g>
      ))}
      <g>
        {Array.from({ length: 19 }, (_, i) => {
          const t = i / 18
          const x = 300 + t * 600
          const y = (1 - t) * (1 - t) * 230 + 2 * (1 - t) * t * 30 + t * t * 230
          return <circle className="s-bulb" cx={x} cy={y} r="4.5" key={i} />
        })}
      </g>
      <Person x={578} y={505} />
      <Person x={622} y={505} />
    </>
  ),
  corporate: (
    <>
      <Platform />
      <Screen x={330} y={130} w={540} h={290}>
        <LedText x={600} y={262} size={46}>YOUR ASK</LedText>
        <LedText x={600} y={320} size={46}>IS OUR TASK</LedText>
      </Screen>
      <Screen x={120} y={210} w={170} h={190} />
      <Screen x={910} y={210} w={170} h={190} />
      <path className="s-solid" d="M850 505 L858 448 H906 L914 505 Z" />
      <Person x={812} y={505} />
    </>
  ),
  concert: (
    <>
      <Platform />
      <path className="s-floor" d="M90 505 H1110 L1180 545 H20 Z" />
      <path className="s-frame" d="M110 505 V100 H1090 V505 M110 150 H1090 M170 100 V505 M1030 100 V505" />
      <g>
        {Array.from({ length: 24 }, (_, i) => (
          <circle className="s-bulb" cx={190 + i * 35.6} cy="125" r="5" key={i} />
        ))}
      </g>
      <Screen x={280} y={180} w={640} h={260}>
        {[120, 88, 56, 26].map((r, i) => (
          <circle className={i % 2 ? 's-ring-b' : 's-ring-a'} cx="600" cy="310" r={r} key={r} />
        ))}
      </Screen>
      <Person x={600} y={505} s={1.1} />
      <Person x={450} y={505} />
      <Person x={750} y={505} />
      <path className="s-solid" d="M500 505 h70 v-30 h-70 Z M640 505 h70 v-30 h-70 Z" />
    </>
  ),
  political: (
    <>
      <Platform />
      <Screen x={250} y={100} w={700} h={250}>
        <LedText x={600} y={220} size={44}>SUMMIT</LedText>
        <path className="s-rim" d="M520 245 H680" />
      </Screen>
      <path className="s-solid" d="M280 505 V438 H920 V505 Z" />
      <path className="s-rim" d="M280 438 H920" />
      {[340, 430, 520, 680, 770, 860].map((x) => (
        <g transform={`translate(${x} 438)`} className="s-person" key={x}>
          <circle cx="0" cy="-22" r="9" />
          <path d="M-14 0 Q0 -18 14 0 Z" />
        </g>
      ))}
      <path className="s-solid" d="M570 505 L578 420 H622 L630 505 Z" />
      <path className="s-rim" d="M578 420 H622" />
      <circle className="s-person" cx="600" cy="392" r="10" />
    </>
  ),
  trade: (
    <>
      <path className="s-deck" d="M40 500 H1160 L1200 545 H0 Z" />
      {[
        [90, 270, 300],
        [440, 200, 320],
        [810, 300, 300],
      ].map(([x, y, w]) => (
        <g key={x}>
          <path className="s-frame" d={`M${x} 500 V${y} H${x + w} V500`} />
          <rect className="s-glow" x={x} y={y} width={w} height="44" />
          <rect className="s-screen" x={x + 45} y={y + 80} width={w - 90} height="90" />
          <path className="s-solid" d={`M${x + 60} 500 V${y + 200} H${x + w - 60} V500 Z`} />
        </g>
      ))}
      <Person x={395} y={505} />
      <Person x={745} y={505} />
    </>
  ),
  gala: (
    <>
      <path className="s-deck" d="M40 500 H1160 L1200 545 H0 Z" />
      <path className="s-frame" d="M600 0 V110" />
      <path className="s-glow" d="M470 110 Q600 215 730 110 Z" />
      {[490, 545, 600, 655, 710].map((x) => (
        <path className="s-garland" d={`M${x} 118 v${x === 600 ? 82 : 46}`} key={x} />
      ))}
      <Screen x={400} y={250} w={400} h={150}>
        <LedText x={600} y={340} size={38}>GALA NIGHT</LedText>
      </Screen>
      {[170, 400, 800, 1030].map((x) => (
        <g key={x}>
          <ellipse className="s-solid" cx={x} cy="470" rx="96" ry="22" />
          <path className="s-solid" d={`M${x - 94} 470 L${x - 88} 512 H${x + 88} L${x + 94} 470 Z`} />
          <ellipse className="s-rim" cx={x} cy="468" rx="96" ry="22" />
          <circle className="s-bloom" cx={x} cy="450" r="9" />
        </g>
      ))}
    </>
  ),
}

const rows = [
  { y: 566, s: 0.52 },
  { y: 592, s: 0.68 },
  { y: 620, s: 0.86 },
  { y: 650, s: 1.08 },
  { y: 682, s: 1.34 },
]

function Audience({ heads }: { heads: number }) {
  const people = Array.from({ length: heads }, (_, i) => {
    const row = rows[(i * 3) % rows.length]
    return { i, ...row, x: ((i * 0.6180339) % 1) * 1240 - 20 }
  }).sort((a, b) => a.y - b.y)

  return (
    <g>
      {people.map(({ i, x, y, s }) => (
        <g transform={`translate(${x.toFixed(1)} ${y}) scale(${s})`} key={i}>
          <g className="head" style={{ animationDelay: `${(i % 12) * 26}ms` }}>
            <path d="M-24 34 Q-23 8 0 8 Q23 8 24 34 Z" />
            <circle cy="-6" r="13" />
          </g>
        </g>
      ))}
    </g>
  )
}

export function StageScene({ scene, heads }: { scene: SceneKey; heads: number }) {
  return (
    <svg className="scene" viewBox="0 0 1200 680" preserveAspectRatio="xMidYMax slice" role="presentation" aria-hidden="true">
      <g className="scene-set" key={scene}>{sets[scene]}</g>
      <Audience heads={heads} />
    </svg>
  )
}
