import { post } from '/@/utils/request'
export const test = () => post('https://api.apiopen.top/getJoke?page=1&count=2&type=video')
