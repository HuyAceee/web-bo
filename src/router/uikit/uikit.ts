export const UIKitRoutes = [
  // add route for uikit there
  {
    name: 'select',
    path: 'select',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/SelectView.vue'),
    meta: { title: 'UIKit - Select', isNotRequiresAuth: true }
  },
  {
    name: 'menu',
    path: 'menu',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/MainTemplateRouteView.vue'),
    meta: { title: 'UIKit - Select', isNotRequiresAuth: true }
  },
  {
    name: 'pagination',
    path: 'pagination',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/PaginationView.vue'),
    meta: { title: 'UIKit - Pagination', isNotRequiresAuth: true }
  },
  {
    name: 'data-table',
    path: 'data-table',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/DataTableView.vue'),
    meta: { title: 'UIKit - Data table', isNotRequiresAuth: true }
  },
  {
    name: 'head-sub-title',
    path: 'head-sub-title',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/HeaderSubTitleTextView.vue'),
    meta: { title: 'UIKit - Head Subtile', isNotRequiresAuth: true }
  },
  {
    name: 'checkbox',
    path: 'checkbox',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/CheckboxView.vue'),
    meta: { title: 'UIKit - Checkbox', isNotRequiresAuth: true }
  },
  {
    name: 'mdButton',
    path: 'md-button',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/button/MdButtonView.vue'),
    meta: { title: 'UIKit - Md Button', isNotRequiresAuth: true }
  },
  {
    name: 'bigButton',
    path: 'big-button',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/button/BigButtonView.vue'),
    meta: { title: 'UIKit - Big Button', isNotRequiresAuth: true }
  },
  {
    name: 'colorButton',
    path: 'color-button',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/button/ColorButtonView.vue'),
    meta: { title: 'UIKit - Color Button', isNotRequiresAuth: true }
  },
  {
    name: 'backButton',
    path: 'back-button',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/button/BackButtonView.vue'),
    meta: { title: 'UIKit - Back Button', isNotRequiresAuth: true }
  },
  {
    name: 'tabText',
    path: 'tab-text',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TabTextView.vue'),
    meta: { title: 'UIKit - Tab Text', isNotRequiresAuth: true }
  },
  {
    name: 'tabOutline',
    path: 'tab-outline',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TabOutlineView.vue'),
    meta: { title: 'UIKit - Tab Outline', isNotRequiresAuth: true }
  },
  {
    name: 'tabFilled',
    path: 'tab-filled',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TabFilledView.vue'),
    meta: { title: 'UIKit - Tab Filled', isNotRequiresAuth: true }
  },
  {
    name: 'singleTab',
    path: 'single-tab',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TabSingleView.vue'),
    meta: { title: 'UIKit - Tab Single', isNotRequiresAuth: true }
  },
  {
    name: 'radio',
    path: 'radio',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/RadioView.vue'),
    meta: { title: 'UIKit - Radio', isNotRequiresAuth: true }
  },
  {
    name: 'inputbox',
    path: 'inputbox',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/InputTextView.vue'),
    meta: { title: 'UIKit - Text Input', isNotRequiresAuth: true }
  },
  {
    name: 'validationComponent',
    path: 'validation-component',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/InputTextValidationView.vue'),
    meta: { title: 'UIKit - Text Input With Validation', isNotRequiresAuth: true }
  },
  {
    name: 'date-time-picker',
    path: 'date-time-picker',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/DateTimePickerView.vue'),
    meta: { title: 'UIKit - Date Time Picker', isNotRequiresAuth: true }
  },
  {
    name: 'date-picker',
    path: 'date-picker',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/DatePickerView.vue'),
    meta: { title: 'UIKit - Date Picker', isNotRequiresAuth: true }
  },
  {
    name: 'textbox',
    path: 'textbox',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TextBoxView.vue'),
    meta: { title: 'UIKit - Text Box', isNotRequiresAuth: true }
  },
  {
    name: 'body-text',
    path: 'body-text',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/BodyTextView.vue'),
    meta: { title: 'UIKit - Body Text', isNotRequiresAuth: true }
  },
  {
    name: 'editor',
    path: 'editor',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/EditorView.vue'),
    meta: { title: 'UIKit - Editor', isNotRequiresAuth: true }
  },
  {
    name: 'sub-color',
    path: 'sub-color',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/SubColorView.vue'),
    meta: { title: 'UIKit - Sub Color', isNotRequiresAuth: true }
  },
  {
    name: 'neutral',
    path: 'neutral',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/NeutralColorView.vue'),
    meta: { title: 'UIKit - Neutral Color', isNotRequiresAuth: true }
  },
  {
    name: 'close-icon',
    path: 'close-icon',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/CloseIconView.vue'),
    meta: { title: 'UIKit - Close Icon', isNotRequiresAuth: true }
  },
  {
    name: 'content-header',
    path: 'content-header',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/ContentHeaderView.vue'),
    meta: { title: 'UIKit - Content Header', isNotRequiresAuth: true }
  },
  {
    name: 'Tag',
    path: 'tag',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/TagView.vue'),
    meta: { title: 'UIKit - Tag', isNotRequiresAuth: true }
  },
  {
    name: 'Switch',
    path: 'switch',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/uikit/SwitchView.vue'),
    meta: { title: 'UIKit - Switch', isNotRequiresAuth: true }
  }
]
