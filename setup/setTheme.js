import Core from '@airbnb/lunar'

Core.initialize({
  defaultLocale: 'en',
  defaultTimezone: 'UTC',
  name: 'AppName',
  fontFamily: 'WhyteBook',
})

function applyThemeColors() {
  const { aesthetic } = Core
  aesthetic.themes.light.color.core.primary = [
    '#3F98A2',
    '#EF4927',
    '#3F98A2',
    '#3A4EA1',
    '#8790EC',
    '#00B36B',
  ]
}

applyThemeColors()
