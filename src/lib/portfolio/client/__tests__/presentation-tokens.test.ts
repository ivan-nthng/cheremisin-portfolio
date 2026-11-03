import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import ts from 'typescript'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cssNumber } from '@/lib/utils'

afterEach(() => vi.unstubAllGlobals())

describe('numeric presentation token bridge', () => {
  it('preserves zero/negative CSS inputs and original values without a stylesheet', () => {
    vi.stubGlobal('window', undefined)
    expect(cssNumber('--motion-note-enter-y', -10)).toBe(-10)
    vi.stubGlobal('window', {})
    vi.stubGlobal('document', { documentElement: {} })
    const values: Record<string, string> = { '--zero': '0', '--negative': '-10px', '--duration': '180ms' }
    vi.stubGlobal('getComputedStyle', () => ({ getPropertyValue: (name: string) => values[name] ?? '' }))
    expect(cssNumber('--zero', 7)).toBe(0)
    expect(cssNumber('--negative', 7)).toBe(-10)
    expect(cssNumber('--duration', 7)).toBe(180)
    expect(cssNumber('--missing', 7)).toBe(7)
  })

  it('keeps invariant client CSS inputs equal to their SSR/original values', () => {
    const css = readFileSync(resolve('src/app/globals.css'), 'utf8')
    const declarations = Object.fromEntries([...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(m => [m[1], m[2].trim()]))
    const value = (name: string, seen: string[] = []): string => {
      expect(seen).not.toContain(name)
      expect(declarations[name]).toBeDefined()
      return declarations[name].replace(/var\((--[\w-]+)\)/g, (_, alias) => value(alias, [...seen, name]))
    }
    let checked = 0
    for (const file of ['HitoLink', 'InfoBlock', 'UIDemo', 'layout/ContactSheet']) {
      const source = readFileSync(resolve(`src/components/${file}.tsx`), 'utf8')
      const tree = ts.createSourceFile(file + '.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
      function visit(node: ts.Node) {
        if (ts.isCallExpression(node) && node.expression.getText(tree) === 'cssNumber') {
          const token = node.arguments[0]
          expect(ts.isStringLiteral(token)).toBe(true)
          if (ts.isStringLiteral(token)) {
            const cssValue = Number.parseFloat(value(token.text))
            const original = Number(node.arguments[1].getText(tree))
            expect(Number.isFinite(cssValue), token.text).toBe(true)
            expect(cssValue, token.text).toBe(original)
            checked++
          }
        }
        ts.forEachChild(node, visit)
      }
      visit(tree)
    }
    expect(checked).toBeGreaterThan(10)
  })
})
