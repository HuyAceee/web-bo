<!-- BO_O0103_010101 -->
<script setup lang="ts">
import CompanyGroupButtonAction from '@/components/company/CompanyGroupButtonAction.vue'
import CompanyBasicInformation from '@/components/company/companyCustomerRegistration/CompanyBasicInformation.vue'
import { useCompanyCustomerRegistration } from '@/composables/company/customerManagement/useCompanyCustomerRegistration'

const {
  values,
  onPageChange,
  onHandleSave,
  setFieldValue,
  mapCategoryToBusinessTypes,
  bizCategories,
  mapObjectBusinessTypes,
  mapObjectCategories,
  checkExistData
} = useCompanyCustomerRegistration()
</script>

<template>
  <div>
    <form>
      <div class="company-regis-main">
        <div>
          <CompanyBasicInformation
            :map-category-to-business-types="mapCategoryToBusinessTypes"
            :biz-categories="bizCategories"
            :value-props="values"
            :map-object-business-types="mapObjectBusinessTypes"
            :map-object-categories="mapObjectCategories"
            @set-data-value="setFieldValue"
            @check-exists="checkExistData"
          />
        </div>
      </div>
    </form>
    <CompanyGroupButtonAction @page-change="onPageChange" @on-save-data="onHandleSave" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'CompanyCustomerRegistrationPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/company/customerManagement/company-customer-registration.css');
</style>
