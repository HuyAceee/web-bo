import complaintManagement from './config/complaint-management.json'
import mainLogin from './config/main-login.json'
import memberManagement from './config/member-management.json'
import productManagement from './config/product-management.json'
import uikit from './config/uikit.json'
import deliveryManagement from './config/delivery-management.json'
import exhibitionManagement from './config/exhibition-management.json'
import categoryManagement from './config/category-management.json'
import operatingManagement from './config/operating-management.json'
import customerManagement from './config/company-management.json'
import partnerManagement from './config/partner-management.json'

export const useHTMLListData = () => {
  const items = [
    ...uikit,
    ...mainLogin,
    ...productManagement,
    ...memberManagement,
    ...complaintManagement,
    ...deliveryManagement,
    ...exhibitionManagement,
    ...categoryManagement,
    ...operatingManagement,
    ...partnerManagement,
    ...customerManagement
  ].filter((item) => item.visible)
  items.forEach((item) => {
    item.contents = item.contents.filter((i) => i.visible !== false)
  })
  return {
    items
  }
}
