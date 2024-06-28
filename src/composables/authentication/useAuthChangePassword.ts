import {
  CONFIRM_PASSWORD_REQUIRED,
  CURRENT_PASSWORD_NOT_MATCH,
  NEW_PASSWORD_INVALID,
  NEW_PASSWORD_LENGTH_INVALID,
  NEW_PASSWORD_NOT_MATCH,
  NEW_PASSWORD_REQUIRED,
  PASSWORD_REQUIRED,
  RESET_SAME_PASSWORD,
  getMessageByType,
  passwordRegex,
  storage,
  PASSWORD_EXPIRED,
  PASSWORD_RESET_REQUIRED,
  IDENTITY_VERIFICATION_REQUIRED,
  LOGIN_STATUS
} from '@/common'
import { useHistoryRouter } from '@/composables/common/useHistoryRouter'
import { HOMEPAGE_ROUTER } from '@/common/router'
import { WelfareModalOneButton } from '@/components'
import { useLoading, useModal } from '@/composables/common'
import { ErrorType } from '@/models'
import { API_RESPONSE_CODE, API_RESPONSE_STATUS } from '@/services/api/ApiResponseCode'
import { authApi } from '@/services/api/authentication/AuthApi'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useModalNotification } from '@/composables'
import { object, string, ref as yupRef } from 'yup'

const DEFAULT_VISIBLE_VALUE = {
  password: false,
  newPassword: false,
  confirmNewPassword: false
}

export const useAuthChangePassword = () => {
  let loginStatus: any
  const { goBack } = useHistoryRouter()

  const inputError = ref('')

  const { closeModalByPop, showModal } = useModal()
  const { openModal } = useModalNotification()
  const router = useRouter()

  const { setLoading } = useLoading()

  const isPasswordValid = string().required(PASSWORD_REQUIRED)
  const isNewPasswordValid = string()
    .required(NEW_PASSWORD_REQUIRED)
    .min(8, NEW_PASSWORD_LENGTH_INVALID)
    .max(20, NEW_PASSWORD_LENGTH_INVALID)
    .matches(passwordRegex, NEW_PASSWORD_INVALID)
    .notOneOf([yupRef('password')], RESET_SAME_PASSWORD)

  const isConfirmPasswordValid = string()
    .required(CONFIRM_PASSWORD_REQUIRED)
    .min(8, NEW_PASSWORD_LENGTH_INVALID)
    .max(20, NEW_PASSWORD_LENGTH_INVALID)
    .matches(passwordRegex, NEW_PASSWORD_INVALID)
    .oneOf([yupRef('newPassword')], NEW_PASSWORD_NOT_MATCH)

  const resetPasswordSchema = {
    password: isPasswordValid,
    newPassword: isNewPasswordValid,
    confirmNewPassword: isConfirmPasswordValid
  }

  const { errors, values, handleSubmit, meta, setFieldError } = useForm({
    /* initialErrors will trigger the watch function*/
    initialErrors: {
      password: PASSWORD_REQUIRED,
      newPassword: NEW_PASSWORD_REQUIRED,
      confirmNewPassword: CONFIRM_PASSWORD_REQUIRED
    },
    validationSchema: object().shape(resetPasswordSchema)
  })

  onMounted(() => {
    loginStatus = storage.get(LOGIN_STATUS)
  })
  const visibility = ref({ ...DEFAULT_VISIBLE_VALUE })

  const handleChangeVisibility = (field: keyof typeof visibility.value) => {
    visibility.value[field] = !visibility.value[field]
  }

  const resetVisibility = () => {
    visibility.value = DEFAULT_VISIBLE_VALUE
  }
  watch([errors, values], ([errors, values]) => {
    if (meta.value.dirty) {
      if (errors.password) {
        inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, errors.password)
      } else if (errors.newPassword) {
        inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, errors.newPassword)
      } else if (errors.confirmNewPassword) {
        if (values.confirmNewPassword?.length === 0) {
          inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, CONFIRM_PASSWORD_REQUIRED)
        } else {
          inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, errors.confirmNewPassword)
        }
      } else {
        inputError.value = ''
      }
    }
  })
  const isInputInvalid = computed(() => (field: keyof typeof resetPasswordSchema): boolean => {
    if (field === 'password') {
      const isValid =
        !errors.value.password || !meta.value.dirty || (!values.password && !values.newPassword && !values.confirmNewPassword && meta.value.dirty)
          ? false
          : true
      return isValid
    }

    if (field === 'newPassword') {
      const isValid =
        (!errors.value.newPassword || errors.value.password || !meta.value.dirty) &&
        (!errors.value.confirmNewPassword || !values.confirmNewPassword || errors.value.password)
          ? false
          : true
      return isValid
    }

    if (field === 'confirmNewPassword') {
      const isValid =
        ((!errors.value.confirmNewPassword || errors.value.newPassword || !meta.value.dirty || (errors.value.password && errors.value.password)) &&
          (!errors.value.newPassword || !values.newPassword || (errors.value.password && errors.value.password))) ||
        (!values.confirmNewPassword && errors.value.newPassword)
          ? false
          : true
      return isValid
    }

    return false
  })

  const handleConfirm = () => {
    closeModalByPop?.()
    //reset store
    storage.remove(LOGIN_STATUS)
    // can not get the route history yet, waiting for apis
    router.push(HOMEPAGE_ROUTER)
    // typeof redirectFrom === 'string' && redirectFrom === AUTH_USER_INFORMATION_ROUTER ? router.push(AUTH_USER_INFORMATION_ROUTER) : router.push(AUTH_LOGIN_ROUTER)
  }
  const handleCancel = () => {
    closeModalByPop?.()
    // can not get the route history yet, waiting for apis
    loginStatus === PASSWORD_EXPIRED ? router.push(HOMEPAGE_ROUTER) : goBack()
    // typeof redirectFrom === 'string' && redirectFrom === AUTH_USER_INFORMATION_ROUTER && router.push(AUTH_USER_INFORMATION_ROUTER)
  }

  const toggleDialogCancel = () => {
    if ([PASSWORD_RESET_REQUIRED, IDENTITY_VERIFICATION_REQUIRED].includes(loginStatus)) {
      openModal({
        content: '새로운 비밀번호로 변경해 주셔야 관리자 시스템을 이용할 수 있습니다.'
      })
    } else handleCancel()
  }
  const handleSubmitResetPassword = () => {
    if (!values.password) inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, PASSWORD_REQUIRED)
    handleSubmitResetPasswordFinal()
  }
  const handleSubmitResetPasswordFinal = handleSubmit(async (values) => {
    resetVisibility()
    try {
      setLoading?.(true)
      await authApi.changePassword({
        currentPassword: values.password,
        newPassword: values.newPassword
      })
      setLoading?.(false)
      toggleDialogConfirm()
    } catch (error: any) {
      setLoading?.(false)
      if (error.status === API_RESPONSE_STATUS.BAD_REQUEST) {
        const { code } = error.data
        if (code === API_RESPONSE_CODE.CURRENT_PASSWORD_NOT_MATCH) {
          setFieldError('password', CURRENT_PASSWORD_NOT_MATCH)
        }
      }
    }
  })
  const toggleDialogConfirm = () => {
    showModal?.({ component: WelfareModalOneButton, props: { title: '비밀번호가 변경되었습니다.', onConfirm: handleConfirm } })
  }

  return {
    errors,
    isInputInvalid,
    toggleDialogCancel,
    handleChangeVisibility,
    handleSubmitResetPassword,
    inputError,
    visibility
  }
}
