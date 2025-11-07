import instance from "../plugins/axios.ts";
import {getCurrentUserState, setCurrentUserState} from "../states/user.ts";

// 缓存获取用户信息
export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState()
    // if (currentUser) {
    //     return currentUser;
    // }
    const res = await instance.get('/user/current')
    if (res.code === 20000) {
        setCurrentUserState(res.data)
        return res.data
    }
    return null
}