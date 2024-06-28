import { ref } from "vue"

export const useExhibitionHallCategoryManagement = () => {
    const exhibitionBasicInfo = ref()
    
    return {
        exhibitionBasicInfo
    }
}