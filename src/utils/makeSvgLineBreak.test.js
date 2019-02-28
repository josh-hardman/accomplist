import makeSvgLineBreak from './makeSvgLineBreak'

describe('makes SVG line breaks from title', () => {
  test('Breaks on spaces', () => {
    const text = 'stress tolerance'
    expect(makeSvgLineBreak(text)).toEqual(['stress', 'tolerance'])
  })
  test('Breaks on -, and includes the dash', () => {
    const text = 'self-tolerance'
    expect(makeSvgLineBreak(text)).toEqual(['self-', 'tolerance'])
  })
  test('Breaks after an &', () => {
    const text = 'listening & questioning'
    expect(makeSvgLineBreak(text)).toEqual(['listening &', 'questioning'])
  })
  test('Does not break if single word', () => {
    const text = 'listening'
    expect(makeSvgLineBreak(text)).toEqual(['listening'])
  })
})
