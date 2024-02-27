import { commonLight } from '../../../_styles/common'
import type { ThemeCommonVars } from '../../../_styles/common'
import type { Theme } from '../../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    scrollbarColor,
    scrollbarColorHover,
    scrollbarWidth,
    scrollbarHeight,
    scrollbarBorderRadius
  } = vars
  return {
    color: scrollbarColor,
    colorHover: scrollbarColorHover,
    yBarWidth: scrollbarWidth,
    xBarHeight: scrollbarHeight,
    borderRadius: scrollbarBorderRadius
  }
}

export type ScrollbarThemeVars = ReturnType<typeof self>

const scrollbarLight: Theme<'Scrollbar', ScrollbarThemeVars> = {
  name: 'Scrollbar',
  common: commonLight,
  self
}

export default scrollbarLight
export type ScrollbarTheme = typeof scrollbarLight
