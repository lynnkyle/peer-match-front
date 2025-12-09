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
export const recommendUser = async () => {
    const res = await instance.get('/user/recommend',
        {
            params: {
                pageNum: 1,
                pageSize: 8
            },
        }
    )
    if (res.code === 20000) {
        return res.data
    }
    return null
}

export const matchUser = async () => {
    const res = await instance.get('/user/match',
        {
            params: {
                num: 10
            }
        }
    )
    if (res.code === 20000) {
        return res.data
    }
    return null
}