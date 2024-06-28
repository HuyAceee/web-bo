import { AppConfig } from "./configs"

export const getImageUrlFrom = (params?: {
    dirFileName?:string
}) => {
    return `${AppConfig.imageHost}/${params?.dirFileName}`
}
