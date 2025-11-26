import instance from "../plugins/axios.ts";
import {showFailToast} from "vant";

export const listTeams = async (url = '', key = '', val = '') => {
    let param: Record<string, any> | null = null
    if (key != '') {
        param = {
            [key]: val
        }
    }
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

export const listAllTeams = async (key = '', val = '') => {
    return listTeams('/team/list', key, val)
}

export const listCurrentUserCreateTeams = async (key = '', val = '') => {
    return listTeams('/team/list/current/create', key, val)
}

export const listCurrentUserJoinTeams = async (key = '', val = '') => {
    return listTeams('/team/list/current/join', key, val)
}