import { RouteRecordRawExtends } from '@/models'
import {
  BulletinAdminPopupDetail,
  BulletinAdminPopupList,
  BulletinAdministratorManualDetail,
  BulletinAdministratorManualList,
  BulletinPartnerNoticeDetail,
  BulletinPartnerNoticeList,
  FaqMngtDetail,
  FaqMngtList,
  ForbiddenWordsList,
  NoticeMngtDetail,
  NoticeMngtList
} from '@/views/bulletin-board'
import { WrapRouteView } from '@/views'
import IconTableNews from '@/components/icons/IconTableNews.vue'

const data: RouteRecordRawExtends = {
  name: '게시판 관리',
  image: IconTableNews,
  component: WrapRouteView,
  path: '/bulletin-board',
  id: 155,
  children: [
    {
      name: '공지사항 관리',
      path: 'notice',
      id: 292,
      component: WrapRouteView,
      children: [
        {
          name: '공지사항 관리 (목록)',
          path: 'list',
          id: 296,
          component: NoticeMngtList,
          nameComponent: 'noticeList',
          meta: { title: 'Notice Mngt List' }
        },
        {
          name: '공지사항 상세',
          path: 'detail/:id',
          id: 'notice-mngt-detail',
          isHideMenu: true,
          component: NoticeMngtDetail,
          nameComponent: 'NoticeMngtDetail',
          meta: { title: 'Notice Mngt Detail' }
        },
        {
          name: '공지사항 등록',
          path: 'create',
          id: 297,
          component: NoticeMngtDetail,
          nameComponent: 'NoticeMngtCreate',
          meta: { title: 'Notice Mngt Create' }
        }
      ]
    },
    {
      name: 'FAQ 관리',
      path: 'faq',
      id: 293,
      component: WrapRouteView,
      children: [
        {
          name: 'FAQ 관리 (목록)',
          path: 'list',
          id: 298,
          component: FaqMngtList,
          nameComponent: 'FaqMngtList',
          meta: { title: 'Faq Mngt List' }
        },
        {
          name: 'FAQ 상세',
          path: 'detail/:id',
          id: 'faq-mngt-detail',
          isHideMenu: true,
          component: FaqMngtDetail,
          nameComponent: 'FaqMngtDetail',
          meta: { title: 'Faq Mngt Detail' }
        },
        {
          name: 'FAQ 등록',
          path: 'create',
          id: 299,
          component: FaqMngtDetail,
          nameComponent: 'FaqMngtCreate',
          meta: { title: 'Faq Mngt Create' }
        }
      ]
    },
    {
      name: '파트너 이용안내',
      component: WrapRouteView,
      path: 'partner-user-guide',
      id: 294,
      children: [
        {
          name: '파트너 공지사항',
          path: 'partner-notice',
          id: 300,
          component: BulletinPartnerNoticeList,
          nameComponent: 'PartnerNotice',
          meta: { title: 'Partner Notice' }
        },
        {
          name: '파트너 공지사항 상세',
          path: 'partner-notice-detail/:id',
          id: 'partner-notice-detail',
          isHideMenu: true,
          component: BulletinPartnerNoticeDetail,
          nameComponent: 'PartnerNoticeDetail',
          meta: { title: 'Partner Notice Detail' }
        },
        {
          name: '파트너 공지사항 등록',
          path: 'partner-notice-create',
          id: 'partner-notice-create',
          isHideMenu: true,
          component: BulletinPartnerNoticeDetail,
          nameComponent: 'PartnerNoticeCreate',
          meta: { title: 'Partner Notice Create' }
        },
        {
          name: '관리자 매뉴얼',
          path: 'administrator-manual',
          id: 301,
          component: BulletinAdministratorManualList,
          nameComponent: 'AdministratorManual',
          meta: { title: 'Administrator Manual' }
        },
        {
          name: '관리자 매뉴얼 상세',
          path: 'administrator-manual-detail/:id',
          isHideMenu: true,
          id: 'administrator-manual-detail',
          component: BulletinAdministratorManualDetail,
          nameComponent: 'AdministratorManualDetail',
          meta: { title: 'Administrator Manual Detail' }
        },
        {
          name: '관리자 매뉴얼 등록',
          path: 'administrator-manual-create',
          id: 'administrator-manual-create',
          isHideMenu: true,
          component: BulletinAdministratorManualDetail,
          nameComponent: 'AdministratorManualCreate',
          meta: { title: 'Administrator Manual Create' }
        },
        {
          name: '관리자 팝업',
          path: 'admin-popup',
          id: 302,
          component: BulletinAdminPopupList,
          nameComponent: 'AdminPopup',
          meta: { title: 'Admin Popup' }
        },
        {
          name: '관리자 팝업 상세',
          path: 'admin-popup-detail/:id',
          id: 'admin-popup-detail',
          isHideMenu: true,
          component: BulletinAdminPopupDetail,
          nameComponent: 'AdminPopupDetail',
          meta: { title: 'Admin Popup Detail' }
        },
        {
          name: '관리자 팝업 등록',
          path: 'admin-popup-create',
          id: 'admin-popup-create',
          isHideMenu: true,
          component: BulletinAdminPopupDetail,
          nameComponent: 'AdminPopupCreate',
          meta: { title: 'Admin Popup Create' }
        }
      ]
    },
    {
      name: '금칙어 관리',
      path: 'forbidden-words',
      id: 295,
      component: ForbiddenWordsList,
      children: []
    }
  ]
}

export default data
