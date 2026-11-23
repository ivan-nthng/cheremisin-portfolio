import Image from 'next/image'
import tile from '../products/products-library.module.css'
import styles from './metabox-projects-grid.module.css'

type Project = {
  name: string
  detail: string
  href: string
  image: string
}

// Preserve the supplied Design Studio fragment, including the configured canopy state.
const tuuciConfigurator = [
  "https://www.tuuci.com/customizer/?translation=en#/configurator/canopy?state=(colorFilterTags:(),configurationId:!n,",
  "controls:(autoNightMode:!t,camera:'0',environment:!f,measurementMode:!f,nightMode:!f,onscreenControls:!t,plantersVisibility:!f,time:13),",
  "editorType:canopy,menuIndex:0,multiBlock:(blockList:!((ACCENT_BORDER:!f,ACCENT_BORDER_FABRIC:'Tandem%20Blanco::MXT%209097',",
  "ALTERNATING_PANELS:!f,ALTERNATING_PANELS_FABRIC:'Tandem%20Blanco::MXT%209097',AMOUNT_OF_PANELS:!n,BASE:'Security%20Mount',BASE_FINISH:!n,",
  "BASE_PILLOW:!f,BASE_PILLOW_FABRIC:'White%20Weather::MXT%209700',BASE_PILLOW_WELT:!f,BASE_PILLOW_WELT_FABRIC:'White%20Snow::MXT%209105',",
  "BASE_SIZE:IGSM,BRUSH_FRINGE:!f,BRUSH_FRINGE_FABRIC:'Tandem%20Blanco::MXT%209097',CLASSIC_ROMAN_VALANCE_DOUBLE:!f,",
  "COLLECTION:'OCEAN%20MASTER',CONTRASTING_BINDING_CUPOLA:!f,CONTRASTING_BINDING_CUPOLA_2_FABRIC:'Tandem%20Blanco::MXT%209097',",
  "CONTRASTING_BINDING_CUPOLA_FABRIC:'Tandem%20Blanco::MXT%209097',CONTRASTING_BINDING_DOUBLE_WIND_VENT:!f,",
  "CONTRASTING_BINDING_FABRIC:'Tandem%20Blanco::MXT%209097',CONTRASTING_POCKETS:!f,CONTRASTING_POCKETS_FABRIC:'Tandem%20Blanco::MXT%209097',",
  "CORD_FRINGE:!f,CORD_FRINGE_FABRIC:'Tandem%20Blanco::MXT%209097',DEFAULT_MAST_FINISH:'Natural%20Aluma-TEAK',DIAMETER:MAX,",
  "DOUBLE-SIDED_CANOPY:!f,DOUBLE-SIDED_CANOPY_FABRIC:'Tandem%20Blanco::MXT%209097',DOUBLE_WIND_VENT:!f,",
  "DOUBLE_WIND_VENT_2_FABRIC:'Tandem%20Blanco::MXT%209097',DOUBLE_WIND_VENT_FABRIC:'Tandem%20Blanco::MXT%209097',",
  "FABRIC_COLOR:'Tandem%20Blanco::MXT%209097',FABRIC_GRADE:'Marine%20MXT%209000-9600',FISHTAIL:!f,FRAME_MODEL:CLASSIC,",
  "HEATER_FINISH_GRADE:heater_finish,HWS_FABRIC:'Tandem%20Blanco::MXT%209097',LIFT_SYSTEM:Auto-Loc,LIGHTING:!f,LIGHTING_2_HEATING:!f,",
  "LIGHTING_2_HEATING_AUTOMATION:!f,LIGHTING_2_HEATING_AUTOMATION_FABRIC:Black,LIGHTING_2_HEATING_FABRIC:Black,LIGHTING_4_HEATING:!f,",
  "LIGHTING_4_HEATING_AUTOMATION:!f,LIGHTING_4_HEATING_AUTOMATION_FABRIC:Black,LIGHTING_4_HEATING_FABRIC:Black,LIGHTING_6_HEATING:!f,",
  "LIGHTING_6_HEATING_AUTOMATION:!f,LIGHTING_6_HEATING_AUTOMATION_FABRIC:Black,LIGHTING_6_HEATING_FABRIC:Black,LIGHTING_AUTOMATION:!f,",
  "MAST_COMPONENT:!n,MAST_FINISH:'Natural%20Aluma-TEAK',MAST_FINISH_ID:mast_finishes,MAST_TYPE:'Center%20Post',MODERN_ROMAN_VALANCE_DOUBLE:!f,",
  "NORTHSTAR_MAST_UPGRADE:!f,NO_ENHANCEMENTS:!t,NO_UPGRADES:!t,PAGODA_VALANCE_COLOR:!f,",
  "PAGODA_VALANCE_COLOR_FABRIC:'Tandem%20Blanco::MXT%209097',POWDER_COAT:!f,POWDER_COAT_FABRIC:'Polished%20Titanium',",
  "POWDER_COAT_GRADE:powder_coat,PROFILE:Market,READY:!t,ROMAN_VALANCE:!f,SCALE:MAX,SCALLOPED_VALANCE:!f,SCALLOPED_VALANCE_DOUBLE:!f,",
  "SCREEN_PRINT_GLOBAL:!f,SCREEN_PRINT_GLOBAL_BOTTOM:!f,SCREEN_PRINT_GLOBAL_BOTTOM_FABRIC:'TS%209047-0560',SCREEN_PRINT_GLOBAL_FABRIC:Belize,",
  "SCREEN_PRINT_GLOBAL_TOP:!f,SCREEN_PRINT_GLOBAL_TOP_FABRIC:'TS%209047-0560',SCREEN_PRINT_GRADE:'Screen%20Prints',SHAPE:Square,",
  "SINGLE_WIND_VENT:!f,SINGLE_WIND_VENT_FABRIC:'Tandem%20Blanco::MXT%209097',SIZE:'8!'',SOFTSCAPE_GRADE:softscape_colors,STRAIGHT_VALANCE:!f,",
  "STRAIGHT_VALANCE_DOUBLE:!f,TASSELS:!f,TASSELS_COLORS:'Marine%20MXT%209000-9600',TASSELS_FABRIC:'White%20Snow::MXT%209105',TEAR_DROP:!f,",
  "TOP_CAP:!f,TOP_CAP_ACCENT_BORDER:!f,TOP_CAP_CONTRASTING_POCKETS:!f,TOP_CAP_CUPOLA:!f,TOP_CAP_FABRIC:'Tandem%20Blanco::MXT%209097',",
  "TRIPLE_ALTERNATING_PANELS:!f,TRIPLE_ALTERNATING_PANELS_FABRIC:'Tandem%20Blanco::MXT%209097',TUFF_WHEELS:!f,TYPE:canopy,VENT:!n,",
  "WHEEL_TRAY:!f,vendorId:'')),currentIndex:0,sectionsCount:Single),panels:(opened:!n),previousStructure:!n,remoteProcessing:!f,search:(),",
  "structure:(ACCENT_BORDER:!f,ACCENT_BORDER_FABRIC:'Tandem%20Blanco::MXT%209097',ALTERNATING_PANELS:!f,",
  "ALTERNATING_PANELS_FABRIC:'Tandem%20Blanco::MXT%209097',AMOUNT_OF_PANELS:!n,BASE:'Security%20Mount',BASE_FINISH:!n,BASE_PILLOW:!f,",
  "BASE_PILLOW_FABRIC:'White%20Weather::MXT%209700',BASE_PILLOW_WELT:!f,BASE_PILLOW_WELT_FABRIC:'White%20Snow::MXT%209105',BASE_SIZE:IGSM,",
  "BRUSH_FRINGE:!f,BRUSH_FRINGE_FABRIC:'Tandem%20Blanco::MXT%209097',CLASSIC_ROMAN_VALANCE_DOUBLE:!f,COLLECTION:'OCEAN%20MASTER',",
  "CONTRASTING_BINDING_CUPOLA:!f,CONTRASTING_BINDING_CUPOLA_2_FABRIC:'Tandem%20Blanco::MXT%209097',",
  "CONTRASTING_BINDING_CUPOLA_FABRIC:'Tandem%20Blanco::MXT%209097',CONTRASTING_BINDING_DOUBLE_WIND_VENT:!f,",
  "CONTRASTING_BINDING_FABRIC:'Tandem%20Blanco::MXT%209097',CONTRASTING_POCKETS:!f,CONTRASTING_POCKETS_FABRIC:'Tandem%20Blanco::MXT%209097',",
  "CORD_FRINGE:!f,CORD_FRINGE_FABRIC:'Tandem%20Blanco::MXT%209097',DEFAULT_MAST_FINISH:'Natural%20Aluma-TEAK',DIAMETER:MAX,",
  "DOUBLE-SIDED_CANOPY:!f,DOUBLE-SIDED_CANOPY_FABRIC:'Tandem%20Blanco::MXT%209097',DOUBLE_WIND_VENT:!f,",
  "DOUBLE_WIND_VENT_2_FABRIC:'Tandem%20Blanco::MXT%209097',DOUBLE_WIND_VENT_FABRIC:'Tandem%20Blanco::MXT%209097',",
  "FABRIC_COLOR:'Tandem%20Blanco::MXT%209097',FABRIC_GRADE:'Marine%20MXT%209000-9600',FISHTAIL:!f,FRAME_MODEL:CLASSIC,",
  "HEATER_FINISH_GRADE:heater_finish,HWS_FABRIC:'Tandem%20Blanco::MXT%209097',LIFT_SYSTEM:Auto-Loc,LIGHTING:!f,LIGHTING_2_HEATING:!f,",
  "LIGHTING_2_HEATING_AUTOMATION:!f,LIGHTING_2_HEATING_AUTOMATION_FABRIC:Black,LIGHTING_2_HEATING_FABRIC:Black,LIGHTING_4_HEATING:!f,",
  "LIGHTING_4_HEATING_AUTOMATION:!f,LIGHTING_4_HEATING_AUTOMATION_FABRIC:Black,LIGHTING_4_HEATING_FABRIC:Black,LIGHTING_6_HEATING:!f,",
  "LIGHTING_6_HEATING_AUTOMATION:!f,LIGHTING_6_HEATING_AUTOMATION_FABRIC:Black,LIGHTING_6_HEATING_FABRIC:Black,LIGHTING_AUTOMATION:!f,",
  "MAST_COMPONENT:!n,MAST_FINISH:'Natural%20Aluma-TEAK',MAST_FINISH_ID:mast_finishes,MAST_TYPE:'Center%20Post',MODERN_ROMAN_VALANCE_DOUBLE:!f,",
  "NORTHSTAR_MAST_UPGRADE:!f,NO_ENHANCEMENTS:!t,NO_UPGRADES:!t,PAGODA_VALANCE_COLOR:!f,",
  "PAGODA_VALANCE_COLOR_FABRIC:'Tandem%20Blanco::MXT%209097',POWDER_COAT:!f,POWDER_COAT_FABRIC:'Polished%20Titanium',",
  "POWDER_COAT_GRADE:powder_coat,PROFILE:Market,READY:!t,ROMAN_VALANCE:!f,SCALE:MAX,SCALLOPED_VALANCE:!f,SCALLOPED_VALANCE_DOUBLE:!f,",
  "SCREEN_PRINT_GLOBAL:!f,SCREEN_PRINT_GLOBAL_BOTTOM:!f,SCREEN_PRINT_GLOBAL_BOTTOM_FABRIC:'TS%209047-0560',SCREEN_PRINT_GLOBAL_FABRIC:Belize,",
  "SCREEN_PRINT_GLOBAL_TOP:!f,SCREEN_PRINT_GLOBAL_TOP_FABRIC:'TS%209047-0560',SCREEN_PRINT_GRADE:'Screen%20Prints',SHAPE:Square,",
  "SINGLE_WIND_VENT:!f,SINGLE_WIND_VENT_FABRIC:'Tandem%20Blanco::MXT%209097',SIZE:'8!'',SOFTSCAPE_GRADE:softscape_colors,STRAIGHT_VALANCE:!f,",
  "STRAIGHT_VALANCE_DOUBLE:!f,TASSELS:!f,TASSELS_COLORS:'Marine%20MXT%209000-9600',TASSELS_FABRIC:'White%20Snow::MXT%209105',TEAR_DROP:!f,",
  "TOP_CAP:!f,TOP_CAP_ACCENT_BORDER:!f,TOP_CAP_CONTRASTING_POCKETS:!f,TOP_CAP_CUPOLA:!f,TOP_CAP_FABRIC:'Tandem%20Blanco::MXT%209097',",
  "TRIPLE_ALTERNATING_PANELS:!f,TRIPLE_ALTERNATING_PANELS_FABRIC:'Tandem%20Blanco::MXT%209097',TUFF_WHEELS:!f,TYPE:canopy,VENT:!n,",
  "WHEEL_TRAY:!f,vendorId:''),unreal_structure:!n,version:'1.02')",
].join('')

const projects: readonly Project[] = [
  {
    name: 'Tuuci',
    detail: 'Canopy configurator',
    href: tuuciConfigurator,
    image: '/images/metabox/suite/tuuci-canopy.webp',
  },
  {
    name: 'DCI Edge',
    detail: 'Series 5 dental chairs',
    href: 'https://www.dciedge.com/products/dental-chairs/series-5/',
    image: '/images/metabox/suite/dci-edge-series-5.webp',
  },
  {
    name: 'Tactile Audio Furniture',
    detail: 'Audio furniture configurator',
    href: 'https://tactileaudiofurniture.com/products/beacon',
    image: '/images/metabox/suite/tactile-audio-beacon.webp',
  },
]

export default function MetaboxProjectsGrid({ imageAttempt = 0 }: { imageAttempt?: number } = {}) {
  return (
    <section className={styles.projects} aria-label="Projects">
      <ul className={styles.grid}>
        {projects.map(project => (
          <li key={project.name}>
            <a className={tile.tile + ' ' + styles.link} href={project.href} target="_blank" rel="noopener noreferrer"
              data-target={project.name === 'Tuuci' ? 'metabox-tuuci-project' : undefined}
              aria-label={project.name + ', ' + project.detail + ' (opens in a new tab)'}>
              <span className={tile.tileHeader + ' ' + styles.tileHeading}>
                <img src="/images/metabox/products/settings/product.svg" width={20} height={20} alt="" />
                <span className={tile.tileName}>{project.name}</span>
                <span className={tile.tileType}>{project.detail}</span>
              </span>
              <span className={tile.thumbnail}>
                <Image key={imageAttempt} data-suite-image src={project.image} fill sizes="(max-width: 550px) calc(100vw - 48px), 284px" loading="eager" alt="" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
