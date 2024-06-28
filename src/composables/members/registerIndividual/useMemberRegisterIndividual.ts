import { MEMBER_REGISTER_INDIVIDUAL, formatTimeByInputString, isEmptyObject, isInteger, passwordRegex } from '@/common'
import { emptyAddress, existEmail } from '@/common/constant'
import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { AccountStatusEnum, EmployeeStatusEnum, GenderCodeEnum, GradeCodeEnum } from '@/models'
import { MemberCustomerRegisterIndividualRequest } from '@/models/services/requests/members/MemberRegisterIndividualRequest'
import { MemberRegisterIndividualFormModel } from '@/models/views/members/templateManagement/MemberRegisterIndividualModel'
import { API_RESPONSE_CODE } from '@/services/api/ApiResponseCode'
import { deliveryInfoApi } from '@/services/api/delivery/DeliveryInfoApi'
import { memberRegisterIndividualApi } from '@/services/api/members/MemberRegisterIndividualApi'
import { operatingAdministratorsRegistrationApi } from '@/services/api/operating/OperatingAdministratorsRegistrationApi'
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import * as yup from 'yup'
import { string } from 'yup'

export const useMemberRegisterIndividual = () => {
  const optionsGender = [
    { label: '구분없음', value: GenderCodeEnum.NONE },
    { label: '여자', value: GenderCodeEnum.WOMAN },
    { label: '남자', value: GenderCodeEnum.MAN }
  ]

  const optionEmploymentStatus = [
    { label: '재직', value: EmployeeStatusEnum.Y },
    { label: '퇴사', value: EmployeeStatusEnum.N }
  ]

  const optionAccountStatus = [
    { label: '사용', value: AccountStatusEnum.ACTIVE },
    { label: '미사용', value: AccountStatusEnum.NOT_ACTIVE }
  ]

  const optionMembershipLevel = [
    { label: '일반', value: GradeCodeEnum.GENERAL },
    { label: '블랙', value: GradeCodeEnum.BLACK }
  ]

  const optionMarketingAgreeYn = [
    { label: '동의', value: EmployeeStatusEnum.Y },
    { label: '미동의', value: EmployeeStatusEnum.N }
  ]

  const { setLoading } = useLoading()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification, closeModalByPop: closeModalNotification } = useModalNotification()
  const searchCustomerRef = ref()
  const customerAddressRef = ref()
  const companyAddressRef = ref()

  const acceptNumber = (event: KeyboardEvent) => {
    if (!isInteger(event.key)) {
      ;(document.activeElement as HTMLInputElement).blur()
      event.preventDefault()
    }
  }

  const emptyForm: MemberRegisterIndividualFormModel = {
    customer: '',
    nameMember: '',
    emailId: '',
    password: '',
    phone: '',
    emailPersonal: '',
    birthday: '',
    jobNumber: '',
    rank: '',
    gender: optionsGender[0].value,
    employmentStatus: optionEmploymentStatus[0].value,
    accountStatus: optionAccountStatus[0].value,
    membershipLevel: optionMembershipLevel[0].value,
    customerAddress: emptyAddress,
    homeAddress: emptyAddress,
    marketingAgreeYn: optionMarketingAgreeYn[0].value
  }

  const formValidationSchema = {
    customer: string().required(MEMBER_REGISTER_INDIVIDUAL.CUSTOMER_REQUIRED),
    nameMember: string().required(MEMBER_REGISTER_INDIVIDUAL.NAME_MEMBER_REQUIRED),
    emailId: string().required(MEMBER_REGISTER_INDIVIDUAL.EMAIL_ID_REQUIRED).email(MEMBER_REGISTER_INDIVIDUAL.EMAIL_INVALID),
    password: string()
      .required(MEMBER_REGISTER_INDIVIDUAL.PASSWORD_REQUIRED)
      .min(9, MEMBER_REGISTER_INDIVIDUAL.PASSWORD_INVALID)
      .max(16, MEMBER_REGISTER_INDIVIDUAL.PASSWORD_INVALID)
      .matches(passwordRegex, MEMBER_REGISTER_INDIVIDUAL.PASSWORD_INVALID),
    phone: string().required(MEMBER_REGISTER_INDIVIDUAL.PHONE_REQUIRED),
    emailPersonal: string().required(MEMBER_REGISTER_INDIVIDUAL.EMAIL_PERSONAL_REQUIRED).email(MEMBER_REGISTER_INDIVIDUAL.PERSONAL_EMAIL_INVALID),
    birthday: string().required(MEMBER_REGISTER_INDIVIDUAL.BIRTHDAY_REQUIRED),
    jobNumber: string().required(MEMBER_REGISTER_INDIVIDUAL.JOB_NUMBER_REQUIRED),
    rank: string().required(MEMBER_REGISTER_INDIVIDUAL.RANK_REQUIRED),
    customerAddress: yup.object().required(MEMBER_REGISTER_INDIVIDUAL.CUSTOMER_ADDRESS_REQUIRED),
    homeAddress: yup.object().required(MEMBER_REGISTER_INDIVIDUAL.CUSTOMER_ADDRESS_REQUIRED)
  }

  const { values, errors, setFieldValue, resetForm } = useForm<MemberRegisterIndividualFormModel>({
    initialValues: emptyForm,
    validationSchema: yup.object(formValidationSchema)
  })

  const onEmailIdChange = (value: string) => {
    if (value == existEmail) {
      openModalNotification({
        content: '회원 아이디가 중복되었습니다.',
        onAccept: () => {
          setFieldValue('emailId', value.slice(0, value.length - 1))
          closeModalNotification?.()
        }
      })
    } else {
      setFieldValue('emailId', value)
    }
  }

  const onSave = async () => {
    const errorMessages: string[] = []
    Object.entries(errors.value).forEach(([, value]) => {
      if (!errorMessages.includes(value)) {
        errorMessages.push(value)
      }
    })
    if (isEmptyObject(errors.value)) {
      const { data } = await operatingAdministratorsRegistrationApi.checkEmail(values.emailId)
      if (data.isExist) {
        openModalNotification({
          content: `이미 등록된 아이디입니다.`
        })
        return
      }
      openModalConfirm({
        content: '회원을 등록 하시겠습니까?',
        onConfirm: () => {
          handleCallSaveApi()
        }
      })
    } else {
      openModalNotification?.({
        content: errorMessages[0],
        buttonLabel: '확인'
      })
    }
  }

  const handleCallSaveApi = async () => {
    const preparedData: MemberCustomerRegisterIndividualRequest = {
      memberId: values.emailId,
      password: values.password,
      memberName: values.nameMember,
      cellphoneNumber: values.phone,
      birthDate: formatTimeByInputString(values.birthday),
      genderCode: values.gender,
      email: values.emailPersonal,
      accountStatusCode: values.accountStatus,
      gradeCode: values.membershipLevel,
      memo: values.notes ?? '',
      deliveryZipCode: Number(values.homeAddress.zipCode),
      deliveryLoadNameAddress: values.homeAddress.loadNameAddress,
      deliveryLoadLotBasedAddress: values.homeAddress.loadLotBasedAddress,
      deliveryDetailedAddress: values.homeAddress.detailedAddress ?? '',
      company: {
        customerKey: Number(values.customer) || 1,
        employeeNumber: values.jobNumber,
        holdingOfficeYn: values.employmentStatus,
        rankName: values.rank,
        companyZipCode: Number(values.customerAddress?.zipCode),
        companyLoadNameAddress: values.customerAddress?.loadNameAddress,
        companyLoadLotBasedAddress: values.customerAddress?.loadLotBasedAddress,
        companyDetailedAddress: values.customerAddress?.detailedAddress ?? ''
      },
      agreement: {
        marketingAgreeYn: values.marketingAgreeYn
      }
    }
    setLoading?.(true)
    memberRegisterIndividualApi
      .saveIndividualMember(preparedData, false)
      .then((res) => {
        if (res.code === API_RESPONSE_CODE.SUCCESS) {
          closeModalConfirm?.()
          openModalNotification({
            content: '회원이 등록 되었습니다.',
            onAccept: () => {
              closeModalNotification?.()
              handleResetForm()
            }
          })
        }
      })
      .catch((err) => {
        if (err.data.code == API_RESPONSE_CODE.CONFLICT_CODE) {
          openModalNotification({
            content: err.data.message
          })
        } else if (err.data.code == API_RESPONSE_CODE.BAD_REQUEST_CODE) {
          openModalNotification({
            content: err.data.errors[0].message || ''
          })
        }
      })
      .finally(() => {
        setLoading?.(false)
      })
  }

  const handleResetForm = () => {
    resetForm()
    searchCustomerRef.value.handleReset()
    customerAddressRef.value.handleReset()
    companyAddressRef.value.handleReset()
  }

  watch(
    () => values.customer,
    async (val) => {
      if (val) {
        const { data } = await deliveryInfoApi.getCustomerFullInfo(parseInt(val))
        const customerAddress = {
          detailedAddress: data.addressDetail,
          loadLotBasedAddress: data.address,
          loadNameAddress: data.streetAddress,
          zipCode: data.zipCode
        }
        setFieldValue('customerAddress', customerAddress)
      }
    }
  )

  return {
    values,
    resetForm,
    setFieldValue,
    onEmailIdChange,
    optionsGender,
    optionEmploymentStatus,
    optionAccountStatus,
    optionMembershipLevel,
    optionMarketingAgreeYn,
    onSave,
    searchCustomerRef,
    customerAddressRef,
    companyAddressRef,
    handleResetForm,
    acceptNumber
  }
}
