export default text => {
  let lineBreak = [text]

  if (text.includes('&')) {
    lineBreak = text.split(' & ')
    lineBreak[0] = lineBreak[0] + ' &'
    return lineBreak
  } else if (text.includes('-')) {
    lineBreak = text.split('-')
    lineBreak[0] = lineBreak[0] + '-'
    return lineBreak
  } else if (text.includes(' ')) {
    lineBreak = text.split(' ')
    return lineBreak
  } else {
    return lineBreak
  }
}
