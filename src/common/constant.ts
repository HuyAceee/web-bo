//localStorage
export const favoriteStorage = 'FAVORITE_STORAGE'
export const listCacheStorage = 'LIST_CACHE'
export const currentActiveStorage = 'CURRENT_ACTIVE'
export const currentAccountId = 'CURRENT_ACCOUNT_ID'
export const ID_CHECKBOX_ALL = 'all'

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
export const DEFAULT_DATE_FORMAT_DOT = 'YYYY.MM.DD'
export const DEFAULT_DATETIME_FORMAT_DOT = 'YYYY. MM. DD HH:MM:ss'
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
export const FORMAT_DATE_YYYY_MM_DD_HH_mm_ss = 'YYYY-MM-DD HH:mm:ss'
export const FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm = 'YYYY.MM.DD hh:mm'
export const FORMAT_DATE_DOT_YYYY_MM_DD_HH_mm = 'YYYY.MM.DD HH:mm'

export const FORMAT_DATE_YYYY = 'YYYY'
export const FORMAT_DATE_YYYY_MM_DD = 'YYYY.MM.DD'

export const FORMAT_DATE_HHmm = 'HHmm'
export const FORMAT_DATE_YYYYMMDD = 'YYYYMMDD'
export const FORMAT_DATE_YYYY_MM_DD_T_hh_mm = 'YYYY-MM-DDThh:mm'
export const FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss = 'YYYY-MM-DDThh:mm:ss'
export const FORMAT_DATE_YYYY_MM_DD_HH_MM_SS = 'YYYY.MM.DD HH:MM:SS'
export const FORMAT_DATE_YYYY_MM_DD_hh_mm_ss = 'YYYY.MM.DD hh:mm:ss'
export const FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM = 'YYYY.MM.DD HH:mm'
export const FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS = 'YYYY.MM.DD HH:mm:ss'
export const DEFAULT_DATE_ERROR_MESSAGE = 'Invalid value'
export const DEFAULT_DATE_FORMAT_ERROR_MESSAGE = 'Invalid format'
export const DEFAULT_DATE_FORMAT_ERROR_MESSAGE_NULL = 'Invalid Date'
export const HEADERS_CALENDAR = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
export const SIZE_OF_TABLE_CALENDAR_DATE = 42
export const _5MB = 5242880
export const _10MB = 10485760
export const _250MB = 262144000
export const MAX_NUMBER_OF_FILE_5 = 5
export const TYPE_IMAGE_FILE = 'image/png, image/jpeg, image/jpg, image/gif'
export const TYPE_VIDEO_FILE = 'video/mp4'
export const TYPE_DOCUMENT_FILE = 'image/png, image/jpeg, image/jpg, application/pdf'
export const ERROR_TYPE = 'ERROR'
export const MAX_LIMIT_PRO_RELEASE_INFO = 1000
export const MAX_LIMIT_COMPLAINT_MODAL = 200
// using for mock data for data table
export const DATA_TABLE_NUMBER_OF_PAGE = 10
export const DATA_TABLE_TOTAL_ITEMS = 1000
export const DATA_TABLE_NUMBER_ITEMS_PAGE_50 = 50
export const DATA_TABLE_NUMBER_ITEMS_PAGE_100 = 100
export const DATA_TABLE_NUMBER_ITEMS_PAGE_200 = 200
export const DATA_TABLE_DEFAULT_DATA_KEY = 'id'
export const NUMBER_OF_PAGE = 10
export const TABLE_LOADING_WAIT_TIME = 500
export const CHARACTER_SEPARATOR = ','
// 60s
export const AXIOS_TIMEOUT = 60 * 1000

export const DEFAULT_TABLE_SELECT_OPTIONS = [
  { label: '50 개씩', value: DATA_TABLE_NUMBER_ITEMS_PAGE_50 },
  { label: '100 개씩', value: DATA_TABLE_NUMBER_ITEMS_PAGE_100 },
  { label: '200 개씩', value: DATA_TABLE_NUMBER_ITEMS_PAGE_200 }
]

export const DEFAULT_TABLE_SELECT_OPTIONS_TWO = [
  { label: '50개씩보기', value: DATA_TABLE_NUMBER_ITEMS_PAGE_50 },
  { label: '100개씩보기', value: DATA_TABLE_NUMBER_ITEMS_PAGE_100 },
  { label: '200개씩보기', value: DATA_TABLE_NUMBER_ITEMS_PAGE_200 }
]

//dash board cache default
export const DASH_BOARD_CACHE = { path: '', name: '', nameComponent: 'DashboardPage' }
export const MODAL_PROVIDE = 'MODAL_PROVIDE'

// Using for number of textarea
export const TEXTAREA_NUMBER_1000 = 1000
export const TEXTAREA_NUMBER_100 = 100
export const TEXTAREA_NUMBER_200 = 200
export const TEXTAREA_NUMBER_400 = 400
export const TEXTAREA_NUMBER_500 = 500

export const TEXT_MAX_NUMBER_1 = 1
export const TEXT_MAX_NUMBER_2 = 2
export const TEXT_MAX_NUMBER_3 = 3
export const TEXT_MAX_NUMBER_5 = 5
export const TEXT_MAX_NUMBER_8 = 8
export const TEXT_MAX_NUMBER_10 = 10
export const TEXT_MAX_NUMBER_11 = 11
export const TEXT_MAX_NUMBER_12 = 12
export const TEXT_MAX_NUMBER_13 = 13
export const TEXT_MAX_NUMBER_15 = 15
export const TEXT_MAX_NUMBER_20 = 20
export const TEXT_MAX_NUMBER_30 = 30
export const TEXT_MAX_NUMBER_31 = 31
export const TEXT_MAX_NUMBER_40 = 40
export const TEXT_MAX_NUMBER_50 = 50
export const TEXT_MAX_NUMBER_60 = 60
export const TEXT_MAX_NUMBER_100 = 100

export const DAYS_PER_WEEK = 6
export const DAYS_PER_MONTH = 29
export const DAYS_PER_THREE_MONTH = 89
export const DAYS_PER_YEAR = 364

export const ROW_SIZE_QUERY_PARAMS_MAX = 999999999

//class-image-scale
export const classScale = '.image-scale'

export const fileDocumentNames = {
  deliveryProductList: {
    url: '/documents/배송_상품_목록.xlsx',
    name: '배송_상품_목록.xlsx'
  },
  ticketProductList: {
    url: '/documents/티켓_상품_목록.xlsx',
    name: '티켓_상품_목록.xlsx'
  },
  memberList: {
    url: '/documents/회원_목록.xlsx',
    name: '회원_목록.xlsx'
  },
  memberBulkRegistration: {
    url: '/documents/엑셀_업로드_파일_형식.xlsx',
    name: '엑셀_업로드_파일_형식.xlsx'
  },
  memberUsagePointBulkRegistration: {
    url: '/documents/혜택_등록_양식.xlsx',
    name: '혜택_등록_양식.xlsx'
  }
}

export const existEmail = 'cuongnm@aladintech.co'
export const datePickerNotification = {
  startDate: {
    date: '시작일은 종료일보다 뒤로 설정할 수 없습니다.',
    'date-time': '시작 시각은 종료 시각보다 <br/> 뒤로 설정할 수 없습니다.'
  },
  endDate: {
    date: '종료일은 시작일보다 앞으로 설정할 수 없습니다.',
    'date-time': '종료 시각은 시작 시각보다 <br/> 앞으로 설정할 수 없습니다.'
  },
  maxLimit: {
    date: '최대 1년 이내에서 조회할 수 있습니다.',
    'date-time': '최대 1년 이내에서 조회할 수 있습니다.'
  }
}

export const emptyAddress = {
  zipCode: '',
  loadNameAddress: '',
  loadLotBasedAddress: '',
  detailedAddress: ''
}

export const NUMBER_DATA_TABLE_IMAGE = 5

export const NAVIGATION_AFTER_AUTHENTICATION_FAIL_TIME = 300000

export const XLS_ACCEPTED_TYPE = '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

export const DAUM_POST_CODE_SCRIPT = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

export const PASSWORD_TEXT = '***************************'
export const XAuthorizationIdItem = 'vitamin21c@naver.com'
export const XAuthorizationRoleItem = 'ROLE_MEMBER'

export const CHECK_INPUT_WITH_0 = 0

export const DATE_PICKER_CHOOSE_YEAR_HEIGHT = 304
export const DATE_PICKER_YEAR_LENGTH_DEFAULT = 150
export const DATE_PICKER_YEAR_LENGTH_MORE = 50

export const DATE_TIME_PICKER_PADDING = 60
export const DATE_TIME_PICKER_ENABLED_ADD_YEAR_TIME = 500

export const BACKSPACE_KEY_CODE = 8
