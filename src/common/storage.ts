export const PRODUCT_DELIVERY_BASE_STORAGE_KEY = 'PRODUCT_DELIVERY_BASE_STORAGE_KEY'
export const PRODUCT_DELIVERY_BASE_STORAGE_TEMPORARY_KEY = 'PRODUCT_DELIVERY_BASE_STORAGE_TEMPORARY_KEY'
export const PRODUCT_DELIVERY_EXHIBITION_STORAGE_KEY = 'PRODUCT_DELIVERY_EXHIBITION_STORAGE_KEY'
export const PRODUCT_DELIVERY_EXHIBITION_STORAGE_TEMPORARY_KEY = 'PRODUCT_DELIVERY_EXHIBITION_STORAGE_TEMPORARY_KEY'
export const PRODUCT_TICKET_BASE_STORAGE_KEY = 'PRODUCT_TICKET_BASE_STORAGE_KEY'
export const PRODUCT_TICKET_BASE_STORAGE_TEMPORARY_KEY = 'PRODUCT_TICKET_BASE_STORAGE_TEMPORARY_KEY'
export const PRODUCT_TICKET_EXHIBITION_STORAGE_KEY = 'PRODUCT_TICKET_EXHIBITION_STORAGE_KEY'
export const PRODUCT_TICKET_EXHIBITION_STORAGE_TEMPORARY_KEY = 'PRODUCT_TICKET_EXHIBITION_STORAGE_TEMPORARY_KEY'
export const PRODUCT_TICKET_MORE_INFO_STORAGE_KEY = 'PRODUCT_TICKET_MORE_INFO_STORAGE_KEY'
export const PRODUCT_TICKET_PROVISION_STORAGE_KEY = 'PRODUCT_TICKET_PROVISION_STORAGE_KEY'
export const PRODUCT_DELIVERY_PROVISION_STORAGE_KEY = 'PRODUCT_DELIVERY_PROVISION_STORAGE_KEY'
export const PRODUCT_DELIVERY_PROVISION_TEMPORARY_KEY = 'PRODUCT_DELIVERY_PROVISION_TEMPORARY_KEY'
export const LOGIN_STATUS = 'LOGIN_STATUS'

export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const storage = {
  get(key: string, type = 'local') {
    const storage = this.getStorage(type)
    return this.getItem(key, storage)
  },

  set(key: string, value: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.setItem(key, JSON.stringify(value))
  },

  remove(key: string, type = 'local') {
    const storage = this.getStorage(type)
    storage?.removeItem(key)
  },

  getItem(key: string, storage: any) {
    if (!key || !storage) return null
    const value = storage.getItem(key)
    if (!value) {
      return null
    }
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },

  getStorage(type = 'local') {
    switch (type) {
      case 'session':
        return sessionStorage
      case 'local':
        return localStorage
      default:
        return null
    }
  }
}
