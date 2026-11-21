'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { personal } from '@/lib/site-content'

export function DocumentaryPreview() {
  const [playing, setPlaying] = useState(false)
  return <div className="personal-film">
    <div className="personal-film-frame">
      {playing
        ? <iframe
          ref={node => node?.focus()}
          src={`https://www.youtube-nocookie.com/embed/${personal.filmId}?autoplay=1&playsinline=1`}
          title={personal.filmTitle}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        : <a href={personal.youtube} aria-label={`Play ${personal.filmTitle}`} onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
          event.preventDefault()
          setPlaying(true)
        }}>
          <img src="/images/personal/cafe-a-proposito-00-41.webp" width="854" height="480" alt="" />
          <span aria-hidden="true"><Play size={22} /></span>
        </a>}
    </div>
  </div>
}
