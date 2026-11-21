import { incomePrograms } from '@/lib/portfolio/client/citymobil-demo'
import NativeAsset from './NativeAsset'
import { citymobilAssets as assets } from './assets'
import styles from './preview.module.css'

type Props = { name: string; car: string; category: string; program?: (typeof incomePrograms)[keyof typeof incomePrograms]; dark: boolean; onProgram?: (trigger: HTMLButtonElement) => void; avatar?: string; plate?: string; rate?: string; motivation?: number }

export default function CitymobilDriverInfo({ name, car, category, program, dark, onProgram, avatar = assets['geographic/driver'].src, plate, rate = '4.56', motivation = 98 }: Props) {
  const percent = program ? Math.round(program.rides / program.required * 100) : 0
  return <div className={styles.driverInfo} data-source-node="6332:12177">
    <div className={styles.driverIdentity}><img src={avatar} alt="" width={44} height={44}/><div><h4>{name}</h4><p><span/>Valid</p></div><button type="button" aria-disabled="true" aria-label="Driver actions — inactive in demo" title="Inactive in this local demo; no service is connected."><NativeAsset name="workspace/imgMore" dark={dark}/></button></div>
    {program && <button type="button" className={styles.driverProgram} onClick={event => onProgram?.(event.currentTarget)} aria-label={program.title + ', ' + percent + '% complete. View program'}><NativeAsset name="geographic/program" plain/><span>{program.title}</span><strong>{percent}%</strong><span className={styles.driverProgress} role="progressbar" aria-label="Program progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{ width: percent + '%' }}/></span></button>}
    <div className={styles.driverVehicle}><div><h4>{car}</h4><p><NativeAsset name="workspace/imgCarFront" dark={dark}/>{category}</p></div>{plate ? <span className={styles.generatedPlate}><small>PT</small>{plate}</span> : <img className={styles.driverPlate} src={assets['geographic/plate'].src} alt="Fictional plate PT A344-34" width={76} height={18}/>}</div>
    <CitymobilDriverMetrics motivation={motivation} rate={rate} dark={dark}/>
  </div>
}

export function CitymobilDriverMetrics({ motivation = 98, rate = '4.56', dark, order = false }: { motivation?: number; rate?: string; dark: boolean; order?: boolean }) {
  return <div className={styles.driverMetrics}><div><strong><NativeAsset name={order ? "order/motivation" : "geographic/motivation"} dark={dark}/>{motivation}</strong><span>Motivation</span></div><div><strong><NativeAsset name={order ? "order/rate" : "geographic/rate"} dark={dark}/>{rate}</strong><span>Rate</span></div><div><img src={assets['geographic/status'].src} alt="Standart" width={86} height={28}/><span>Status</span></div></div>
}
