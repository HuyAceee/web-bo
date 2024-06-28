import { authApi } from '@/services/api/authentication/AuthApi'
import { API_RESPONSE_CODE } from '@/services/api/ApiResponseCode'
export const useEmailAuthentication = () => {
  const verifyEmail = async (accessToken: string) => {
    try {
      const token = accessToken
      const response = await authApi.emailVerify(token)
      if (response && response.code === API_RESPONSE_CODE.SUCCESS) {
        const { data } = response
        return { policyViolated: data?.policyViolated, policyViolation: data?.policyViolation, isMinutesOverdue: true }
      }
    } catch (error: any) {
      if (error?.data?.data?.policyViolated) {
        return { policyViolated: error?.data?.data?.policyViolated, policyViolation: error?.data?.data?.policyViolation, isMinutesOverdue: true }
      }
      return { isMinutesOverdue: false }
    }
  }
  return { verifyEmail }
}
