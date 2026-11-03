import { homeIdentity } from '@/lib/site-content'

/** The supplied photograph is decorative. Its reserved stage survives slow,
 * failed and script-free loading; only the image receives presentation toning. */
export function HomePhotoHero() {
  return <section className="home-photo-hero" aria-label="Introduction">
    <div className="home-photo-media" aria-hidden="true">
      <picture>
        <source type="image/avif"
          srcSet="/images/home/surf-800.avif 800w, /images/home/surf-1600.avif 1600w, /images/home/surf-2560.avif 2560w"
          sizes="(max-aspect-ratio: 4/3) calc(100svh * 4 / 3), 100vw" />
        {/* Native picture selection preserves the approved encodings/grain. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/surf-2560.webp" width={2560} height={1920}
          alt="" loading="eager" fetchPriority="high" decoding="async" />
      </picture>
    </div>
    <div className="home-hero-copy portfolio-grid-lane">
      <div className="home-hero-name-space">
        <noscript>
          <style>{'#portfolio-identity { display: none !important; }'}</style>
          <h1 className="home-hero-static-name">{homeIdentity.name}</h1>
        </noscript>
      </div>
      <div className="home-hero-details">
        <p className="home-hero-roles">{homeIdentity.roles}</p>
        <div className="home-hero-introduction">
          {homeIdentity.introduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </div>
    <span hidden data-home-eye-ready="" />
  </section>
}
