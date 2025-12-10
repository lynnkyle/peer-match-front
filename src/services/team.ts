import instance from "../plugins/axios.ts";
import {showFailToast} from "vant";

export const listTeams = async (url = '', param = {}) => {
    const res = await instance.get(url, {
        params: param
    })
    if (res?.code === 20000 && res.data) {
        return res.data
    } else {
        showFailToast(res?.description)
    }
    return null
}

export const listAllTeams = async (param = {}) => {
    return listTeams('/team/list', param)
}

export const listCurrentUserCreateTeams = async (param = {}) => {
    return listTeams('/team/list/current/create', param)
}

export const listCurrentUserJoinTeams = async (param = {}) => {
    return listTeams('/team/list/current/join', param)
}