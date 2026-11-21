export function PortfolioArrow({ direction = 'external' }: { direction?: 'external' | 'right' | 'left' }) {
  const file = direction === 'external' ? 'up-right' : direction
  // Figma local arrow masters 2459:136 / 2459:61 / 2459:56. Preserve 16px root geometry.
  return <img className="portfolio-arrow" src={`/icons/portfolio/arrow-${file}.svg`} alt="" width={16} height={16} aria-hidden="true" />
}
