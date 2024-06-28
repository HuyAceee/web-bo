import { useRouter } from 'vue-router'

export const useHistoryRouter = () => {
  const router = useRouter()
  const goBack = () => {
    router.go(-1)
  }
  const redirectRouter = (route: string) => {
    router.push(route)
  }
  return { goBack, redirectRouter }
}
