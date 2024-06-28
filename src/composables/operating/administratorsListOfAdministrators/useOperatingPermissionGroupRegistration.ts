import { OPERATE_ADMINISTRATOR_PERMISSION_LIST, lengthInUtf8Bytes } from '@/common'
import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { OperatingPermissionGroupDetailResponse } from '@/models/services/responses/operating/boAdministrator/OperatingPermissionGroupResponse'
import { OperatingSiteCategoryResponseConverter } from '@/models/services/responses/operating/site/OperatingSiteCategoryResponse'
import {
  GroupNameOptions,
  GroupNameOptionsType,
  OperatingPermissionGroupForm,
  PermissionGroupType,
  defaultPermissions,
  getDefaultGroupRoleForm
} from '@/models/views/operating/adminManagement/OperatingPermissionGroupRegistrationModel'
import { OperatingSiteCategoryTreeListItemModel } from '@/models/views/operating/operatingMangement/OperatingSiteCategoryModel'
import { operatingPermissionGroupRegistrationApi } from '@/services/api/operating/OperatingPermissionGroupRegistrationApi'
import { operatingSiteBoCategoryApi } from '@/services/api/operating/site/OperatingSiteManagementApi'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const useOperatingPermissionGroupRegistration = () => {
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  const { openModal: openConfirm } = useModalConfirm()
  const { setLoading } = useLoading()
  const router = useRouter()
  const route = useRoute()

  const formValue = ref<OperatingPermissionGroupForm>(getDefaultGroupRoleForm())
  const nodes = ref<OperatingSiteCategoryTreeListItemModel[]>([])
  const dataDetail = ref<OperatingPermissionGroupDetailResponse | undefined>()
  const handleChange = <K extends keyof OperatingPermissionGroupForm>(key: K, value: any): void => {
    if (key === 'deptInfo' && lengthInUtf8Bytes(value) > 200) {
      openModalNotification({
        content: '한글 기준 100자 이내로 입력 해주세요.'
      })
      return
    }
    formValue.value[key] = value
    if (key === 'groupName') {
      formValue.value.groupNameInput = ''
      formValue.value.checkExistedGroupNameInput = false
    }
  }

  const getSiteMenu = async () => {
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

  const checkMenuIdExisteded = async () => {
    const text = formValue.value.groupName === GroupNameOptionsType.textInput ? formValue.value.groupNameInput?.trim() : formValue.value.groupName
    if (text) {
      const { data } = await operatingPermissionGroupRegistrationApi.checkAuthorityGroupsName(text)
      openModalNotification({
        content: data ? '이미 사용중인 권한 그룹명 입니다.' : '사용 가능한 권한 그룹명입니다.'
      })
      formValue.value.checkExistedGroupNameInput = data
    }
  }

  const getStatusRole = (node: OperatingSiteCategoryTreeListItemModel, role: keyof PermissionGroupType['permissions']): boolean => {
    return formValue.value.menus.find((val) => val.key === node.key)?.permissions[role] ?? false
  }

  function findParents(
    arr: OperatingSiteCategoryTreeListItemModel[],
    node: OperatingSiteCategoryTreeListItemModel,
    parents: OperatingSiteCategoryTreeListItemModel[] = []
  ): OperatingSiteCategoryTreeListItemModel[] {
    for (const item of arr) {
      if (item.key === node.key) {
        return parents
      }

      if (item.children && item.children.length > 0) {
        const result = findParents(item.children, node, [...parents, item])
        if (result.length > 0) {
          return result
        }
      }
    }

    return []
  }

  const setNode = (node: OperatingSiteCategoryTreeListItemModel, role: keyof PermissionGroupType['permissions'], value: boolean, only?: boolean) => {
    const targetIndex = formValue.value.menus.findIndex((val) => val.key === node.key)
    if (targetIndex === -1) {
      formValue.value.menus.push({
        key: node.key,
        permissions: {
          ...defaultPermissions,
          [role]: value
        }
      })
    } else {
      formValue.value.menus[targetIndex].permissions[role] = value
    }
    if (!only) {
      node.children.forEach((val) => {
        setNode(val, role, value)
      })
    }
  }

  const setStatusRole = (
    node: OperatingSiteCategoryTreeListItemModel,
    role: keyof PermissionGroupType['permissions'],
    value: boolean,
    noRecursive?: boolean
  ) => {
    if (role === 'read' && !value && !noRecursive) {
      const targetIndex = formValue.value.menus.findIndex((val) => val.key === node.key)
      if (formValue.value.menus[targetIndex].permissions['write'] || formValue.value.menus[targetIndex].permissions['approve']) {
        return
      }
    }

    if (value) {
      const parents = findParents(nodes.value, node, [])
      parents.forEach((val: any) => {
        setNode(val, role, value, true)
      })
    }

    setNode(node, role, value)
    if (noRecursive) {
      return
    }
    if (role === 'write' || role === 'approve') {
      if (value === true) {
        setStatusRole(node, 'read', value)
      } else {
        setStatusRole(node, 'read', value, true)
        if (role !== 'write') setStatusRole(node, 'write', value, true)
        if (role !== 'approve') setStatusRole(node, 'approve', value, true)
      }
    }
  }

  const saveForm = async () => {
    if (formValue.value.groupName === GroupNameOptionsType.textInput) {
      if (!formValue.value.groupNameInput || formValue.value.checkExistedGroupNameInput) {
        openModalNotification({
          content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
        })
        return
      }
    }
    if (lengthInUtf8Bytes(formValue.value.deptInfo) > 200) {
      openModalNotification({
        content: '한글 기준 100자 이내로 입력 해주세요.'
      })
      return
    }
    const menuRole = formValue.value.menus.filter((val) => {
      return val.permissions['approve'] || val.permissions['read'] || val.permissions['write'] || val.permissions['personalInformationManagement']
    })
    if (menuRole.length === 0) {
      openModalNotification({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
      })
      return
    }
    const preData = {
      groupName: formValue.value.groupName === GroupNameOptionsType.textInput ? formValue.value.groupNameInput : formValue.value.groupName,
      groupUseYn: formValue.value.groupUseYn,
      deptInfo: formValue.value.deptInfo,
      menus: menuRole
    }
    try {
      setLoading?.(true)
      if (formValue.value.groupKey) {
        await operatingPermissionGroupRegistrationApi.updatePermissionGroup(formValue.value.groupKey, preData)
        getPermissionGroupDetail(formValue.value.groupKey)
        openModalNotification({
          content: '저장이 완료되었습니다.'
        })
      } else {
        const { headers } = await operatingPermissionGroupRegistrationApi.createPermissionGroup(preData)
        const groupKeyReturn: number = headers?.location?.split('/').slice(-1)
        openModalNotification({
          content: '저장이 완료되었습니다.',
          onAccept: () => {
            router.push({ query: { groupKey: groupKeyReturn } })
            closeModalByPop?.()
          }
        })
      }
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }

  const handleDelete = () => {
    openConfirm({
      content: '취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        router.push({ path: OPERATE_ADMINISTRATOR_PERMISSION_LIST })
      }
    })
  }

  const getPermissionGroupDetail = async (groupKey: number) => {
    try {
      setLoading?.(true)
      const { data } = await operatingPermissionGroupRegistrationApi.getPermissionGroupDetail(groupKey)
      const isGroupNameIsDefault = !!GroupNameOptions.find((v) => v.value === data.name)
      formValue.value = {
        groupKey: data.groupKey,
        groupName: isGroupNameIsDefault ? data.name : GroupNameOptionsType.textInput,
        groupNameInput: isGroupNameIsDefault ? '' : data.name,
        checkExistedGroupNameInput: false,
        deptInfo: data.deptInfo,
        groupUseYn: data.active,
        menus: data.menuPermissions?.map((v) => ({
          key: v.menuKey,
          permissions: v.permissions
        }))
      }
      dataDetail.value = data
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }

  watch(
    () => route.query.groupKey as string,
    async (groupKey) => {
      if (groupKey) {
        getPermissionGroupDetail(Number(groupKey))
      } else {
        resetForm()
      }
    }
  )

  onMounted(() => {
    getSiteMenu()
    if (route.query.groupKey) {
      getPermissionGroupDetail(Number(route.query.groupKey))
    }
  })

  const resetForm = () => {
    formValue.value = getDefaultGroupRoleForm()
  }

  onBeforeUnmount(() => {
    resetForm()
  })

  return {
    dataDetail,
    nodes,
    formValue,
    handleChange,
    checkMenuIdExisteded,
    getStatusRole,
    setStatusRole,
    saveForm,
    handleDelete
  }
}
export default useOperatingPermissionGroupRegistration
