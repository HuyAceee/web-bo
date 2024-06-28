import { isInParentWithClass } from '@/common'
import { App } from 'vue'

export const addDateTimerPickerDirective = (app: App<Element>) => {
  app.directive('click-outside', {
    mounted(el, binding) {
      el.clickOutsideEvent = function (event: Event) {
        if (
          !(el === event.target || el.contains(event.target)) &&
          !(isInParentWithClass(event.target as HTMLElement, 'wf-modal-container-main') && document?.getElementsByClassName('wf_modal-notification')?.length > 0)
        ) {
          binding.value()
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted: (el) => {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  })
}
