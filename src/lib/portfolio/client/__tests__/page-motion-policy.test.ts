import { describe, expect, it } from 'vitest'
import { appPopstateRecoveryHref, casePaths, homeBackHref } from '@/components/portfolio/navigation/policy'

const url = (path: string) => new URL(path, 'https://portfolio.example')

describe('portfolio header Back', () => {
  it.each(casePaths)('goes to the home project list from %s', path => {
    expect(homeBackHref(path)).toBe('/#projects')
  })

  it('goes to the home hero from non-case pages', () => {
    expect(homeBackHref('/manifesto')).toBe('/')
    expect(homeBackHref('/projects')).toBe('/')
  })
})

describe('App Router portfolio history recovery', () => {
  it('preserves the destination query and fragment for a native history entry', () => {
    expect(appPopstateRecoveryHref(null, '/projects/metabox', url('/?from=case#projects')))
      .toBe('/?from=case#projects')
  })

  it('leaves router-owned entries and same-page anchors alone', () => {
    expect(appPopstateRecoveryHref({ __NA: true }, '/projects/metabox', url('/#projects'))).toBeNull()
    expect(appPopstateRecoveryHref(null, '/', url('/#projects'))).toBeNull()
  })

  it('does not take over Pages Router or non-portfolio routes', () => {
    expect(appPopstateRecoveryHref(null, '/', url('/projects/ds-hito'))).toBeNull()
    expect(appPopstateRecoveryHref(null, '/', url('/preview/metabox/products'))).toBeNull()
  })
})
