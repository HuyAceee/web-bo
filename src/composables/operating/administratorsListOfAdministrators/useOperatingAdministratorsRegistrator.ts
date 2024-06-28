import {
  OPERATE_ADMINISTRATOR_PERMISSION_LIST,
  TEXTAREA_NUMBER_200,
  TEXT_MAX_NUMBER_10,
  TEXT_MAX_NUMBER_11,
  TEXT_MAX_NUMBER_20,
  TEXT_MAX_NUMBER_30,
  TEXT_MAX_NUMBER_5,
  alphaBetIDRegex2,
  emailRegex2,
  integerRegex,
  isInteger,
  lengthInUtf8Bytes,
  spaceMatchRegex
} from '@/common'
import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { PermissionGroupAuthority } from '@/models/services/responses/operating/boAdministrator/OperatingAdministratorsRegistrationResponse'
import { OperatingPermissionGroupDetailResponse } from '@/models/services/responses/operating/boAdministrator/OperatingPermissionGroupResponse'
import { OperatingSiteCategoryResponseConverter } from '@/models/services/responses/operating/site/OperatingSiteCategoryResponse'
import {
  OperatingAdminPermissionRegisForm,
  getDefaultAdminPermissionRegisForm
} from '@/models/views/operating/adminManagement/OperatingAdministratorsRegistrationModel'
import { PermissionGroupType } from '@/models/views/operating/adminManagement/OperatingPermissionGroupRegistrationModel'
import { OperatingSiteCategoryTreeListItemModel } from '@/models/views/operating/operatingMangement/OperatingSiteCategoryModel'
import { operatingAdministratorsRegistrationApi } from '@/services/api/operating/OperatingAdministratorsRegistrationApi'
import { operatingPermissionGroupRegistrationApi } from '@/services/api/operating/OperatingPermissionGroupRegistrationApi'
import { operatingSiteBoCategoryApi } from '@/services/api/operating/site/OperatingSiteManagementApi'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const useOperatingAdministratorsRegistrator = () => {
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  const { openModal: openConfirm } = useModalConfirm()
  const { setLoading } = useLoading()
  const router = useRouter()
  const route = useRoute()
  const formValue = ref<OperatingAdminPermissionRegisForm>(getDefaultAdminPermissionRegisForm())
  const groupNameOptions = ref<PermissionGroupAuthority[]>([])
  const nodes = ref<OperatingSiteCategoryTreeListItemModel[]>([])
  const dataPermissionsGroupDetail = ref<OperatingPermissionGroupDetailResponse | undefined>()

  const handleChange = <K extends keyof OperatingAdminPermissionRegisForm>(key: K, value: any): void => {
    const validate = getMessageValidate({ ...getDefaultAdminPermissionRegisForm(), [key]: value } as any)
    const error = validate[key]
    if (error === 'block') {
      return
    } else if (error) {
      closeModalByPop?.()
      openModalNotification({ content: error })
    } else {
      formValue.value[key] = value
    }
    if (key === 'managerId') {
      formValue.value.checkManagerIdExisted = true
    } else if (key === 'phone') {
      formValue.value.checkPhoneExisted = true
    } else if (key === 'email') {
      formValue.value.checkEmailExisted = true
    }
  }

  const getMessageValidate = (value: OperatingAdminPermissionRegisForm) => {
    const validateField: { [K in keyof OperatingAdminPermissionRegisForm]: string | undefined } = {
      isActive: undefined,
      managerId: undefined,
      checkManagerIdExisted: undefined,
      managerName: undefined,
      password: undefined,
      phone: undefined,
      checkPhoneExisted: undefined,
      email: undefined,
      checkEmailExisted: undefined,
      deptInfo: undefined
    }

    {
      let mes = ''
      const val = value.managerId?.trim()
      if (val.length > TEXT_MAX_NUMBER_20) {
        mes = '아이디는 5~20자의 영문 소문자/숫자/특수기호(하이픈 -, 언더바_)로 입력해 주세요.'
      }
      validateField['managerId'] = mes
    }
    {
      let mes = ''
      const val = value.managerName?.trim()
      if (lengthInUtf8Bytes(val) > TEXT_MAX_NUMBER_20) {
        mes = '한글 기준 10자 이내로 입력 해주세요'
      }
      validateField['managerName'] = mes
    }
    {
      let mes = ''
      const val = value.phone?.trim()
      if (val && !integerRegex.test(val)) {
        mes = '휴대폰번호를 다시 확인해 주세요. 휴대폰번호 형식이 올바르지 않습니다.'
      } else if (val.length > TEXT_MAX_NUMBER_11) {
        mes = 'block'
      }
      validateField['phone'] = mes
    }
    {
      let mes = ''
      const val = value.email?.trim()
      if (val.length > TEXT_MAX_NUMBER_30) {
        mes = 'block'
      }
      validateField['email'] = mes
    }
    {
      let mes = ''
      if (lengthInUtf8Bytes(value.deptInfo) > TEXTAREA_NUMBER_200) {
        mes = '기준 100자 이내로 입력 해주세요.'
      }
      validateField['deptInfo'] = mes
    }
    return validateField
  }

  const getMessageValidateSubmited = (value: OperatingAdminPermissionRegisForm) => {
    const validateField: {
      required: string | undefined
    } & { [K in keyof OperatingAdminPermissionRegisForm]: string | undefined } = {
      required: undefined,
      isActive: undefined,
      managerId: undefined,
      checkManagerIdExisted: undefined,
      managerName: undefined,
      password: undefined,
      phone: undefined,
      checkPhoneExisted: undefined,
      email: undefined,
      checkEmailExisted: undefined,
      deptInfo: undefined
    }
    let required = false
    {
      let mes = ''
      const val = value.authorityGroupKey
      if (!val) {
        mes = '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
        required = true
      }
      validateField['authorityGroupKey'] = mes
    }
    {
      let mes = ''
      const val = value.managerId?.trim()
      if (!val) {
        mes = '아이디를 입력 해주세요.'
        required = true
      } else if (!alphaBetIDRegex2.test(val)) {
        mes = '특수기호로 시작하거나 특수기호로만 이뤄진 아이디는 사용할 수 없습니다.'
      } else if (isInteger(val[0]) || isInteger(val)) {
        mes = '숫자로 시작하거나 숫자로만 이뤄진 아이디는 사용할 수 없습니다.'
      } else if (val.length < TEXT_MAX_NUMBER_5 || val.length > TEXT_MAX_NUMBER_20 || spaceMatchRegex.test(val)) {
        mes = '아이디는 5~20자의 영문 소문자/숫자/특수기호(하이픈 -, 언더바_)로 입력해 주세요.'
      }
      validateField['managerId'] = mes
    }

    // {
    //   const checkManagerIdExisted = value.checkManagerIdExisted
    //   const mes = '이미 사용중인 아이디입니다. 다른 아이디를 입력해 주세요.'
    //   validateField['checkManagerIdExisted'] = checkManagerIdExisted ? mes : ''
    // }

    {
      let mes = ''
      const val = value.managerName?.trim()
      if (!val) {
        required = true
      } else if (val.length > TEXT_MAX_NUMBER_10) {
        mes = '한글 기준 10자 이내로 입력 해주세요.'
      }
      validateField['managerName'] = mes
    }
    {
      const val = value.password?.trim()
      if (formValue.value.managerKey ? false : !val) {
        required = true
      }
    }
    {
      let mes = ''
      const val = value.phone?.trim()
      if (!val) {
        mes = '휴대전화를 입력 해주세요.'
        required = true
      } else if (!integerRegex.test(val) || val.length > TEXT_MAX_NUMBER_11) {
        mes = '휴대폰번호를 다시 확인해 주세요. 휴대폰번호 형식이 올바르지 않습니다.'
      }
      validateField['phone'] = mes
    }

    // {
    //   let mes = ''
    //   const val = value.checkPhoneExisted
    //   mes = val ? '이미 사용중인 휴대전화 번호입니다. 다른 휴대전화를 입력 해주세요.' : ''
    //   validateField['checkPhoneExisted'] = mes
    // }
    {
      let mes = ''
      const val = value.email?.trim()
      if (!val) {
        mes = '이메일 주소를 입력 해주세요.'
        required = true
      } else if (!emailRegex2.test(val)) {
        mes = '이메일주소를 다시 확인 해주세요. 이메일주소 형식이 올바르지 않습니다.'
      }
      validateField['email'] = mes
    }
    // {
    //   let mes = ''
    //   const val = value.checkEmailExisted
    //   mes = val ? '이미 사용중인 이메일입니다.' : ''
    //   validateField['checkEmailExisted'] = mes
    // }
    {
      let mes = ''
      if (lengthInUtf8Bytes(value.deptInfo) > TEXTAREA_NUMBER_200) {
        mes = '기준 100자 이내로 입력 해주세요.'
      }
      validateField['deptInfo'] = mes
    }
    if (required) {
      validateField['required'] = '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
    }
    return validateField
  }

  const getTemporaryPassword = async () => {
    try {
      const {
        data: { password }
      } = await operatingAdministratorsRegistrationApi.getTemporaryPassword()
      formValue.value.password = password
    } catch {
      /* empty */
    }
  }
  const saveForm = async () => {
    const validate = getMessageValidateSubmited(formValue.value)
    const error = Object.entries(validate).find(([, val]) => {
      return !!val
    })?.[1]
    if (error) {
      openModalNotification({
        content: error
      })
    } else {
      const preRequest = { ...formValue.value }
      delete preRequest.auditing
      delete preRequest.checkEmailExisted
      delete preRequest.checkManagerIdExisted
      delete preRequest.checkPhoneExisted

      if (formValue.value.managerKey) {
        try {
          await operatingAdministratorsRegistrationApi.update(formValue.value.managerKey, preRequest)
        } catch {
          /* empty */
        }
        getDetaillData(formValue.value.managerKey)
        openModalNotification({
          content: '저장이 완료되었습니다.'
        })
      } else {
        const { headers } = await operatingAdministratorsRegistrationApi.create(preRequest)
        const managerKey: number = headers?.location?.split('/').slice(-1)
        openModalNotification({
          content: '저장이 완료되었습니다.',
          onAccept: () => {
            router.push({ query: { managerKey: managerKey } })
            closeModalByPop?.()
          }
        })
      }
    }
  }

  const getAuthorityGroupName = async () => {
    try {
      const { data } = await operatingAdministratorsRegistrationApi.getAuthorityGroupsNames()
      groupNameOptions.value = data?.sort((a, b) => a.groupKey - b.groupKey)
    } catch {
      /* empty */
    }
  }

  const getStdCatListMenu = async () => {
    try {
      setLoading?.(true)
      const { data } = await operatingSiteBoCategoryApi.getSiteList()
      const tree = OperatingSiteCategoryResponseConverter.buildTreeDataOperatingArray(data)
      nodes.value = tree
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }

  const checkPhoneExisted = async () => {
    const error = getMessageValidateSubmited(formValue.value).phone
    if (error) {
      openModalNotification({
        content: error
      })
    } else {
      try {
        const { data } = await operatingAdministratorsRegistrationApi.checkPhone(formValue.value.phone)
        openModalNotification({
          content: data.isExist
            ? '이미 사용중인 휴대전화 번호입니다. 다른 휴대전화를 입력 해주세요.'
            : '사용 가능한 휴대폰번호번호입니다. 나머지 항목을 기입 후 등록을 완료해 주세요'
        })
        formValue.value.checkPhoneExisted = data.isExist
      } catch {
        /* empty */
      }
    }
  }
  const checkEmailExisted = async () => {
    const error = getMessageValidateSubmited(formValue.value).email
    if (error) {
      openModalNotification({
        content: error
      })
    } else {
      try {
        const { data } = await operatingAdministratorsRegistrationApi.checkEmail(formValue.value.email)
        openModalNotification({
          content: data.isExist
            ? '이미 사용중인 이메일 주소 입니다. 다른 이메일 주소를 입력 해주세요.'
            : '사용 가능한 이메일 주소 입니다. 나머지 항목을 기입 후 등록을 완료 해주세요.'
        })
        formValue.value.checkEmailExisted = data.isExist
      } catch {
        /* empty */
      }
    }
  }

  const checkManagerIdExisted = async () => {
    const error = getMessageValidateSubmited(formValue.value).managerId
    if (error) {
      openModalNotification({
        content: error
      })
    } else {
      try {
        const { data } = await operatingAdministratorsRegistrationApi.checkManagerId(formValue.value.managerId)
        openModalNotification({
          content: data.isExist
            ? '이미 사용중인 아이디입니다. 다른 아이디를 입력해 주세요.'
            : '사용 가능한 아이디입니다. 나머지 항목을 기입 후 등록을 완료해 주세요.'
        })
        formValue.value.checkManagerIdExisted = data.isExist
      } catch {
        /* empty */
      }
    }
  }
  const getStatusRole = (node: OperatingSiteCategoryTreeListItemModel, role: keyof PermissionGroupType['permissions']): boolean => {
    return dataPermissionsGroupDetail.value?.menuPermissions?.find((val) => val.menuKey === node.key)?.permissions[role] ?? false
  }

  const handleDelete = () => {
    openConfirm({
      content: '취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        router.push({ path: OPERATE_ADMINISTRATOR_PERMISSION_LIST })
      }
    })
  }

  const getDataPermissionsGroupDetail = async (managerKey: number) => {
    try {
      const { data } = await operatingPermissionGroupRegistrationApi.getPermissionGroupDetail(managerKey)
      dataPermissionsGroupDetail.value = data
    } catch {
      /* empty */
    }
  }

  const getDetaillData = async (managerKey: number) => {
    try {
      setLoading?.(true)
      const { data } = await operatingAdministratorsRegistrationApi.detail(managerKey)
      formValue.value = data
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }

  watch(
    () => route.query.managerKey as string,
    async (managerKey) => {
      if (managerKey) {
        getDetaillData(Number(managerKey))
      } else {
        formValue.value = getDefaultAdminPermissionRegisForm()
      }
    }
  )

  watch(
    () => formValue.value.authorityGroupKey,
    async (authorityGroupKey) => {
      if (authorityGroupKey) getDataPermissionsGroupDetail(authorityGroupKey)
    }
  )

  onMounted(() => {
    getAuthorityGroupName()
    getStdCatListMenu()
    if (route.query.managerKey) {
      getDetaillData(Number(route.query.managerKey))
    }
  })

  onBeforeUnmount(() => {
    formValue.value = getDefaultAdminPermissionRegisForm()
  })
  const showPopupInvadlidPhoneNumber = () => {
    openModalNotification({
      content: '휴대폰번호를 다시 확인해 주세요. 휴대폰번호 형식이 올바르지 않습니다.'
    })
  }

  const buildMenuNameStyle = (menuDepth: number) => {
    return { fontWeight: 700 - (menuDepth ?? 0) * 100 }
  }

  return {
    dataPermissionsGroupDetail,
    nodes,
    formValue,
    handleChange,
    groupNameOptions,
    getStatusRole,
    saveForm,
    handleDelete,
    checkEmailExisted,
    checkPhoneExisted,
    checkManagerIdExisted,
    getTemporaryPassword,
    showPopupInvadlidPhoneNumber,
    buildMenuNameStyle
  }
}
export default useOperatingAdministratorsRegistrator
