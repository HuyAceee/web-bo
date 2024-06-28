<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductModalSearchWithTable } from '@/composables/products/modal/modalSearch/useProductModalSearchWithTable'
import { ProductSearchType } from '@/models'

const { openModal } = useProductModalSearchWithTable()
const route = useRoute()
onMounted(() => {
  if (route.query.modal === 'customer-search-modal') {
    openModal(ProductSearchType.CUSTOMER)
  } else if (route.query.modal === 'seller-search-modal') {
    openModal(ProductSearchType.SELLER)
  }
})
</script>
