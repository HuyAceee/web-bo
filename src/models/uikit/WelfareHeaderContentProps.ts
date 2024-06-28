interface WelfarePath {
  name: string
  path?: string
}
export interface WelfareHeaderContentProps {
  paths: WelfarePath[]
  title: string
  isBigHeader?: boolean,
  hasTips?: boolean
  tooltipElement?: string
}
