import { Ref } from 'vue'
import { DAUM_POST_CODE_SCRIPT } from './constant'
import { isBNameDataValid } from './validation'
import { DaumPostcodeSearchResponse } from '@/models/services/responses/common/DaumPostcodeSearchResponse'
import { AddressModel, YnOptions } from '@/models'

export const execDaumPostcode = (
  wfDaumLayer: Ref<any>,
  isDisplayIframe: Ref<boolean>,
  onSearchComplete: (data: AddressModel) => void,
  options: {
    width: number
    height: number
    borderWidth: number
  } = {
    width: 500,
    height: 542,
    borderWidth: 1
  }
) => {
  const initLayerPosition = () => {
    isDisplayIframe.value = true
    wfDaumLayer.value.style.position = 'fixed'
    wfDaumLayer.value.style.paddingTop = '44px'
    wfDaumLayer.value.style.display = 'block'
    wfDaumLayer.value.style.backgroundColor = 'white'
    wfDaumLayer.value.style.borderRadius = '4px'
    wfDaumLayer.value.style.width = options.width + 'px'
    wfDaumLayer.value.style.height = options.height + 'px'
    wfDaumLayer.value.style.border = options.borderWidth + 'px solid'
    wfDaumLayer.value.classList.add('wf-custom-scrollbar')
  }
  // @ts-ignore
  new daum.Postcode({
    // reference: https://postcode.map.daum.net/guide
    oncomplete: function (data: DaumPostcodeSearchResponse) {
      let extraAddr = ''
      const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && isBNameDataValid(data.bname)) {
          extraAddr += data.bname
        }
        // if there is a building name and it is an apartment complex, add it
        if (data.buildingName !== '' && data.apartment === YnOptions.Y) {
          extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName
        }
        extraAddr = extraAddr !== '' ? ` ${extraAddr}` : ''
      }

      // change extraAddress to jbunAddress
      const reference = extraAddr ? ' (' + extraAddr + ')' : ''

      const extraAddressSearch = data.jibunAddress + reference
      const addressSearch = addr + reference
      const postcodeSearch = data.zonecode

      onSearchComplete({
        zipCode: postcodeSearch,
        loadNameAddress: addressSearch,
        loadLotBasedAddress: extraAddressSearch,
        detailedAddress: ''
      })

      wfDaumLayer.value.style.display = 'none'
      isDisplayIframe.value = false
    },
    options: '100%',
    height: '100%',
    maxSuggestItems: 5
  }).embed(wfDaumLayer.value)

  wfDaumLayer.value.style.display = 'block'

  initLayerPosition()
}

export const mountDaumCode = () => {
  const script = document.createElement('script')
  script.src = DAUM_POST_CODE_SCRIPT
  script.async = true
  document.head.appendChild(script)
}

export const handleClickOutsideIframe = (closeIframe: () => void, iframeRef: Ref<any>, event: Event) => {
  if (iframeRef.value && event.target instanceof Node && !iframeRef.value.contains(event.target)) {
    closeIframe()
  }
}
