<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { AUTH_EMAIL_VERIFICATION_NO_CHANGE_PASSWORD, AUTH_EMAIL_VERIFICATION_SUCCESS, AUTHENTICATION_FAIL, LOGIN_STATUS } from '@/common'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEmailAuthentication } from '@/composables/authentication/login/useEmailAuthentication'
import { useStorage } from '@/composables/common'
const [_loginStatus, setLoginStatus] = useStorage<string>(LOGIN_STATUS)

const router = useRouter()
const { verifyEmail } = useEmailAuthentication()
const props = defineProps({ accessToken: { type: String, required: true } })
const verifyCustomAccessToken = async () => {
  const response = await verifyEmail(props.accessToken)
  if (response?.isMinutesOverdue) {
    if (response?.policyViolated) {
      router.push(AUTH_EMAIL_VERIFICATION_SUCCESS)
    } else {
      router.push(AUTH_EMAIL_VERIFICATION_NO_CHANGE_PASSWORD)
    }
    if (response?.policyViolation?.violationType) setLoginStatus(response?.policyViolation?.violationType)
  } else {
    router.push(AUTHENTICATION_FAIL)
  }
}

onMounted(() => {
  verifyCustomAccessToken()
})
</script>
