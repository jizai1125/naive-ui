import {
  h,
  defineComponent,
  VNode,
  provide,
  PropType,
  VNodeChild,
  ExtractPropTypes,
  Ref,
  Slots
} from 'vue'
import type { MergedTheme, ThemeProps } from '../../_mixins'
import { useConfig, useTheme } from '../../_mixins'
import { stepsLight } from '../styles'
import style from './styles/index.cssr'
import {
  createInjectionKey,
  ExtractPublicPropTypes,
  flatten,
  getSlot,
  call
} from '../../_utils'
import type { StepsTheme } from '../styles'

function stepWithIndex (step: VNodeChild, i: number): VNode | null {
  if (typeof step !== 'object' || step === null || Array.isArray(step)) {
    return null
  }
  if (!step.props) step.props = {}
  step.props.internalIndex = i + 1
  return step
}

function stepsWithIndex (steps: VNodeChild[]): Array<VNode | null> {
  return steps.map((step, i) => stepWithIndex(step, i))
}

const stepsProps = {
  ...(useTheme.props as ThemeProps<StepsTheme>),
  current: Number,
  status: {
    type: String as PropType<'process' | 'finish' | 'error' | 'wait'>,
    default: 'process'
  },
  size: {
    type: String as PropType<'small' | 'medium'>,
    default: 'medium'
  },
  vertical: Boolean,
  'onUpdate:current': Function as PropType<(value: number) => void>,
  onUpdateCurrent: Function as PropType<(value: number) => void>
}

export interface StepsInjection {
  props: ExtractPropTypes<typeof stepsProps>
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<StepsTheme>>
  stepsSlots: Slots
}

export type StepsProps = ExtractPublicPropTypes<typeof stepsProps>

export const stepsInjectionKey = createInjectionKey<StepsInjection>('n-steps')

export default defineComponent({
  name: 'Steps',
  props: stepsProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Steps',
      '-steps',
      style,
      stepsLight,
      props,
      mergedClsPrefixRef
    )
    provide(stepsInjectionKey, {
      props,
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      stepsSlots: slots
    })

    function doUpdateValue (value: number): void {
      const { 'onUpdate:current': _onUpdateCurrent, onUpdateCurrent } = props
      console.log(props)
      if (_onUpdateCurrent) call(_onUpdateCurrent, value)
      if (onUpdateCurrent) call(onUpdateCurrent, value)
    }

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      doUpdateValue
    }
  },
  render () {
    const { mergedClsPrefix } = this
    const aa = stepsWithIndex(flatten(getSlot(this)))
    aa.forEach((a: any) => {
      a.props.onClick = () => {
        this.doUpdateValue(a.props.internalIndex as number)
      }
    })
    return (
      <div
        class={[
          `${mergedClsPrefix}-steps`,
          this.vertical && `${mergedClsPrefix}-steps--vertical`
        ]}
      >
        {aa}
      </div>
    )
  }
})
