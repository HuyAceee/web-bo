export const authRoutes = [
  {
    name: 'login',
    path: 'login',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/authentication/login/AuthLoginPage.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    name: 'change-password',
    path: 'change-password',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/authentication/changePassword/AuthChangePasswordPage.vue'),
    meta: {
      title: 'Change Password'
    }
  },
  {
    name: '메가존 플레이 / 인증 완료',
    path: 'email-verification-success',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/authentication/AuthEmailVerificationSuccessPage.vue'),
    meta: {
      title: 'Verification Success'
    }
  },
  {
    name: 'user-information',
    path: 'user-information',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/authentication/editUserInfo/AuthUserInformationPage.vue'),
    meta: {
      title: 'User Information'
    }
  },
  {
    name: 'edit-user-information',
    path: 'edit-user-information',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/authentication/editUserInfo/AuthEditUserInformationPage.vue'),
    meta: {
      title: 'Edit User Information'
    }
  },
  {
    name: 'email-verification-error',
    path: 'email-verification-error',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/authentication/AuthEmailVerificationFailPage.vue'),
    meta: {
      title: 'Verification Fail'
    }
  },
  {
    name: 'email-verification',
    path: 'email-verification',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/authentication/emailAuthentication/AuthEmailVerificationPage.vue'),
    meta: {
      title: 'Verification'
    }
  },
  {
    name: 'email-verification-first-login',
    path: 'email-verification-first-login',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/authentication/login/AuthLoginInformCompletedPage.vue'),
    meta: {
      title: 'Login Completed'
    }
  },
  {
    name: 'email-verification-no-change-password',
    path: 'email-verification-no-change-password',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/authentication/AuthEmailVerificationNoChangePasswordPage.vue'),
    meta: {
      title: 'No change password'
    }
  }
]
