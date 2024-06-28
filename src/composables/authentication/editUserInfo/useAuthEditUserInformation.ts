import { ref } from 'vue'
import { useModalNotification, useModalConfirm } from '@/composables'
import { isInteger, AUTH_USER_INFORMATION_ROUTER, removeLettersPhoneNumber, isValidEmail } from '@/common'
import { useAuthUserInformation } from '../userInfo/useAuthUserInformation'
import { useHistoryRouter } from '../../common/useHistoryRouter'
import { userInfoApi } from '@/services/api/authentication/UserInfoApi'

export const useAuthEditUserInformation = () => {
  const { openModal } = useModalNotification()
  const { userInfo, rootEmail } = useAuthUserInformation()
  const { openModal: openModalConfirm } = useModalConfirm()
  const { goBack, redirectRouter } = useHistoryRouter()
  const isSubmitPhone = ref<boolean>(false)
  const isVerifyEmail = ref<boolean>(false)
  let isExistEmail: boolean = true
  let listEmailValid: string[]
  let listPhoneValid: string[]
  const handleSubmitValue = () => {
    if (userInfo.value.phone === '' || userInfo.value.email === '') {
      openModal?.({
        content: '필수 정보*가 누락되었습니다.<p>필수 정보*를 입력해 주세요.</p>'
      })
    } else if (!isSubmitPhone.value) {
      openModal?.({
        content: '휴대폰번호 중복을 확인해 주세요.'
      })
    } else if (!isVerifyEmail.value) {
      openModal?.({
        content: '이메일 주소를 인증해 주세요.'
      })
    } else {
      resetFormFields()
      openModal?.({
        content: '관리자 정보가 수정되었습니다.',
        onAccept() {
          handleSubmitEditUser()
          redirectRouter(AUTH_USER_INFORMATION_ROUTER)
        }
      })
    }
  }
  const handleCancelValue = () => {
    openModalConfirm({
      content: '취소할 경우 입력한 정보가 저장되지 않습니다.<p>정말 취소하시겠습니까?</p>',
      onConfirm: () => {
        goBack()
      }
    })
  }
  const handleSubmitPhone = async () => {
    try {
      const res = await userInfoApi.getExistsPhone(userInfo.value.phone)
      if (res?.data?.isExist) {
        isSubmitPhone.value = false
        openModal?.({
          content: '이미 등록된 번호입니다.<p>새로운 번호를 입력해 주세요.</p>'
        })
      } else {
        isSubmitPhone.value = true
        // save log list phone number valited
        if (!listPhoneValid?.includes(userInfo.value.phone)) {
          listPhoneValid?.push(userInfo.value.phone)
        }
        openModal?.({
          content: '중복 확인이 완료되었습니다.<p>사용 가능한 휴대폰번호입니다.</p>'
        })
      }
    } catch (error: any) {
      /* empty */
    }
  }
  const handleCheckValidPhone = () => {
    isSubmitPhone.value = false
    if (!isInteger(userInfo.value.phone ?? 0)) {
      openModal?.({
        content: ' 숫자만 입력해 주세요.'
      })
      ;(document.activeElement as HTMLInputElement).blur()
      userInfo.value.phone = removeLettersPhoneNumber(userInfo.value.phone)
    }
    if (userInfo.value.phone.length !== 11) {
      isSubmitPhone.value = true
      return false
    }
    if (listPhoneValid?.includes(userInfo.value.phone)) isSubmitPhone.value = true
    else isSubmitPhone.value = false
  }
  const handleCheckValidEmail = () => {
    isVerifyEmail.value = false
    // check valid email
    if (!isValidEmail(userInfo.value.email)) {
      openModal?.({
        content: ' 이메일 형식이 올바르지 않습니다.<p>다시 입력해 주세요.</p>'
      })
      userInfo.value.email = rootEmail.value
      isVerifyEmail.value = true
    } else {
      handleCheckExistEmail()
    }
    // check exists
  }
  const handleCheckExistEmail = async () => {
    try {
      const res = await userInfoApi.updateEmail(userInfo.value.email)
      if (res?.data?.isExist) {
        isVerifyEmail.value = false
        openModal?.({
          content: '이미 등록된 이메일 주소입니다.<p>새로운 이메일 주소를 입력해 주세요.</p>'
        })
        isVerifyEmail.value = true
        isExistEmail = true
        userInfo.value.email = rootEmail.value
      } else {
        // save log list email valited
        if (!listEmailValid?.includes(userInfo.value.email)) {
          listEmailValid?.push(userInfo.value.email)
        }
        isVerifyEmail.value = false
        isExistEmail = false
        openModal?.({
          content: '새로 입력하신 이메일 주소로 인증키가 발송되었습니다.<p>이메일을 확인해 주세요.</p>'
        })
      }
    } catch (error: any) {
      if (error?.data?.errors.length > 0) {
        openModal?.({
          content: ' 이메일 형식이 올바르지 않습니다.<p>다시 입력해 주세요.</p>'
        })
        isVerifyEmail.value = true
        isExistEmail = true
        userInfo.value.email = rootEmail.value
      }
    }
  }
  const checkExistsEmailValited = () => {
    if (listEmailValid?.includes(userInfo.value.email)) isVerifyEmail.value = true
    else isVerifyEmail.value = false
  }
  const handleConfirmEmail = () => {
    if (isExistEmail)
      openModal?.({
        content: '먼저 이메일 인증을 완료해 주세요.'
      })
    else handleResponseConfirmEmail()
  }
  const handleResponseConfirmEmail = async () => {
    try {
      const res = await userInfoApi.verifyEmail(userInfo.value.email)
      if (res?.data?.isVerified) {
        // save log list email valited
        if (!listEmailValid?.includes(userInfo.value.email)) {
          listEmailValid?.push(userInfo.value.email)
        }
        isVerifyEmail.value = true
        openModal?.({
          content: '이메일 주소 인증이 완료되었습니다.'
        })
      } else {
        // isVerifyEmail.value = true
        openModal?.({
          content: '이메일 인증이 완료되지 않았습니다.'
        })
      }
    } catch (error: any) {
      //  empty
    }
  }
  const resetFormFields = () => {
    userInfo.value.phone = ''
    userInfo.value.email = ''
  }
  const handleSubmitEditUser = async () => {
    try {
      await userInfoApi.editUserInfo(userInfo.value)
    } catch (error: any) {
      /* empty */
    }
  }
  return {
    userInfo,
    isSubmitPhone,
    isVerifyEmail,
    handleSubmitValue,
    handleSubmitPhone,
    handleCheckValidEmail,
    checkExistsEmailValited,
    handleCheckValidPhone,
    handleCancelValue,
    handleConfirmEmail
  }
}
