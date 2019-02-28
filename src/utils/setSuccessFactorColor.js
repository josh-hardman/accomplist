const setSuccessFactorColor = score => {
  // Get globar color pallete from css
  const getCssVar = cssVar => {
    const style = getComputedStyle(document.body)
    return style.getPropertyValue(cssVar)
  }

  const colors = {
    success: getCssVar('--dolphin'),
    strength: getCssVar('--shamrock'),
    growth: getCssVar('--mustard'),
    limiting: getCssVar('--dreamsicle'),
    risk: getCssVar('--hot-tamale'),
    disabled: getCssVar('--charcoal')
  }

  const { success, strength, growth, limiting, risk, disabled } = colors

  let color = ''

  if (!score) {
    color = disabled
  } else if (score >= 90) {
    color = success
  } else if (score >= 75) {
    color = strength
  } else if (score >= 60) {
    color = growth
  } else if (score >= 45) {
    color = limiting
  } else {
    color = risk
  }

  return color
}

export default setSuccessFactorColor
