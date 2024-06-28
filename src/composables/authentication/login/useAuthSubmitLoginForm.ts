/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ACCESS_TOKEN,
  ALL_MAIN_MESSAGES,
  HOMEPAGE_ROUTER,
  ID_REQUIRED,
  PASSWORD_LOGIN_REQUIRED,
  REFRESH_TOKEN,
  currentAccountId,
  getMessageByType,
  isEmpty,
  AUTH_EMAIL_VERIFICATION_FIRST_LOGIN,
  AUTH_CHANGE_PASSWORD_ROUTER,
  LOGIN_STATUS
} from '@/common'
import { useLoading, useStorage } from '@/composables/common'
import { useModalNotification } from '@/composables/widgets'
import { ErrorType } from '@/models'
import { axiosOAuth2Service } from '@/services/AxiosOAuth2Service'
import { authApi } from '@/services/api/authentication/AuthApi'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { object } from 'yup'

interface LoginDataModel {
  memberId: string
  password: string
}

export const useAuthSubmitLoginForm = () => {
  const { openModal, closeAllModal } = useModalNotification()
  const router = useRouter()
  const { setLoading } = useLoading()
  const isShowPassword = ref(false)
  const saveId = ref(false)
  const myForm = {
    memberId: isEmpty,
    password: isEmpty
  }
  const inputError = ref(getMessageByType(ErrorType.ALL_MAIN_MESSAGES, ID_REQUIRED))
  const [accountId, setAccountId] = useStorage<string>(currentAccountId)
  const [_accessToken, setAccessToken] = useStorage<string>(ACCESS_TOKEN)
  const [_loginStatus, setLoginStatus] = useStorage<string>(LOGIN_STATUS)
  const [_refreshToken, setRefreshToken] = useStorage<string>(REFRESH_TOKEN)
  const onSaveAccountId = (id: string) => {
    setAccountId(id)
  }
  const handleGetMessageLogin = (message: string = '', accessToken: string, refreshToken: string) => {
    // case login "본인인증 “미수행” 상태"
    if (message === 'IDENTITY_VERIFICATION_REQUIRED') {
      handleLoginSuccess(AUTH_EMAIL_VERIFICATION_FIRST_LOGIN, message, accessToken, refreshToken)
      return false
    }
    inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, message)
    openModal?.({
      content: inputError.value,
      onAccept() {
        closeAllModal?.()
        // returnRouterConfirmNavigate.value
        //   ? { onClick: handleLoginSuccess(returnRouterConfirmNavigate.value, message, accessToken, refreshToken) }
        //   : {}
        if (returnRouterConfirmNavigate.value) {
          handleLoginSuccess(returnRouterConfirmNavigate.value, message, accessToken, refreshToken)
        }
      }
    })
  }
  const handleOpenModalRequire = (message: string = '') => {
    inputError.value = getMessageByType(ErrorType.ALL_MAIN_MESSAGES, message)
    openModal?.({
      content: inputError.value,
      onAccept() {
        closeAllModal?.()
      }
    })
  }
  const returnRouterConfirmNavigate = computed(() => {
    if (isReturnPageVerifyEmail(inputError.value)) {
      return AUTH_EMAIL_VERIFICATION_FIRST_LOGIN
    } else if (isReturnChangePassword(inputError.value)) {
      return AUTH_CHANGE_PASSWORD_ROUTER
    } else {
      return ''
    }
  })
  const isReturnChangePassword = (message: string) => {
    return [ALL_MAIN_MESSAGES.PASSWORD_EXPIRED].includes(message)
  }
  const isReturnPageVerifyEmail = (message: string) => {
    return [ALL_MAIN_MESSAGES.IDENTITY_VERIFICATION_REQUIRED, ALL_MAIN_MESSAGES.PASSWORD_RESET_REQUIRED].includes(message)
  }
  const handleShowError = (values: LoginDataModel) => {
    const { memberId, password } = values
    if (!memberId) return handleOpenModalRequire(ID_REQUIRED)
    if (!password) return handleOpenModalRequire(PASSWORD_LOGIN_REQUIRED)
    onSubmit()
  }

  const handleLoginSuccess = (route: string, loginType: string, accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setLoginStatus(loginType)
    axiosOAuth2Service.attachHeaderToken({
      accessToken: accessToken
    })
    router.push(route)
  }

  const { values, handleSubmit } = useForm({
    initialValues: {
      memberId: accountId?.value ?? '',
      password: ''
    },
    validationSchema: object(myForm)
  })

  const checkValidation = () => {
    if (saveId.value) {
      onSaveAccountId(values.memberId)
    }
    handleShowError(values)
  }
  const onSubmit = handleSubmit(async (values, { resetForm }) => {
    try {
      setLoading?.(true)
      const response = await authApi.login({
        ...values,
        autoLogin: true
      })
      const { data } = response
      if (!data?.policyViolated) handleLoginSuccess(HOMEPAGE_ROUTER, 'LOGIN_STATUS', data?.accessToken, data?.refreshToken)
      else {
        handleGetMessageLogin(data?.policyViolation?.violationType, data?.accessToken, data?.refreshToken)
        resetForm()
      }
    } catch (error: any) {
      const { data } = error.data
      handleGetMessageLogin(data?.policyViolation?.violationType, data?.accessToken, data?.refreshToken)
    } finally {
      setLoading?.(false)
      resetAccount()
    }
  })
  const resetAccount = async () => {
    try {
      await authApi.resetAccount()
    } catch (error) {
      /* error */
    }
  }
  return { inputError, values, onSubmit, checkValidation, isShowPassword, saveId }
}
