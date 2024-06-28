import { useModalNotification } from '@/composables/widgets'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const categoryOptions = [
  {
    label: '전시',
    value: '전시'
  },
  {
    label: '비전시',
    value: '비전시'
  }
]

const exhibitionOptions = [
  {
    label: '전시',
    value: '전시'
  },
  {
    label: '비전시',
    value: '비전시'
  }
]

const editorOptions = [
  {
    label: '전체',
    value: '전체'
  },
  {
    label: 'PC',
    value: 'PC'
  }
]

export const useProductBrandRegistration = () => {
  const route = useRoute()

  const query = reactive({
    name: '',
    code: '-',
    category: categoryOptions[0],
    description: '',
    detailDescription: '',
    pcBanner: '',
    pcThumbnail: '',
    mobileBanner: '',
    mobileThumbnail: '',
    exhibition: exhibitionOptions[0].value,
    editor: editorOptions[0].value,
    pcHtml: '',
    mobileHtml: ''
  })

  const { openModal } = useModalNotification()

  const onSave = () => {
    if (
      !query.name ||
      !query.description ||
      !query.detailDescription ||
      !query.pcBanner ||
      !query.pcThumbnail ||
      !query.mobileBanner ||
      !query.mobileThumbnail ||
      !query.pcHtml
    ) {
      openModal({
        content: '<p><span class="wf_text-sub-01">(*)</span> 표시는 필수입력항목입니다.</p>'
      })
      return
    }

    if (query.exhibition === exhibitionOptions[1].value && route.query.testCase === 'cant-visible') {
      openModal({
        content: '브랜드에 상품이 등록되어 있어 비전시할 수 없습니다.'
      })
      return
    }

    openModal({
      content: '저장이 완료되었습니다.'
    })
  }
  return { categoryOptions, exhibitionOptions, editorOptions, query, onSave }
}
