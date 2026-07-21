import Link from 'next/link'
import { Sprite, SPRITES, PALETTES } from '@/components/Sprite'

export default function Menu() {
  return (
    <div className="wrap">
      <div className="logo-row">
        <Sprite map={SPRITES.asterisk} palette={PALETTES.brand} px={3} />
        <span>VITAR</span>
        <span>GROUP</span>
      </div>
      <h1 className="logo">TYCOON</h1>
      <p className="tagline">Cesta k 10 miliardám</p>

      <div className="card-paper" style={{ marginBottom: 20 }}>
        <p className="card-text">
          Rok v křesle šéfa VITAR Group. 12 měsíců, 12 rozhodnutí. Start: firma za 1 mld Kč. Cíl:
          10 mld Kč. A hlavně — nezničit náladu týmu.
        </p>
        <p className="card-hap" style={{ marginTop: 14 }}>
          Pozor: rozhodnutí se vracejí. Co v březnu zalepíte izolepou, to vás v červnu dožene.
        </p>
      </div>

      <div className="menu">
        <Link href="/play" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Hrát
        </Link>
      </div>
    </div>
  )
}
