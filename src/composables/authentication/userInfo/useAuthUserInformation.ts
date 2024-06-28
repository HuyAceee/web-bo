import { onMounted, ref } from 'vue'
import { userInfoApi } from '@/services/api/authentication/UserInfoApi'
import { UserInfoModelRequest } from '@/models/services/requests/authentications/UserInfoRequest'
export const useAuthUserInformation = () => {
  const userInfo = ref<UserInfoModelRequest>({} as UserInfoModelRequest)
  const rootEmail = ref<string>('')
  const fetchDataUser = async () => {
    try {
      const res = await userInfoApi.getDataUser()
      if (res) {
        userInfo.value = res.data
        rootEmail.value = res.data.email
      }
    } catch (error) {
      /* empty */
    }
  }

  onMounted(() => {
    fetchDataUser()
  })

  return {
    userInfo,
    rootEmail
  }
}
