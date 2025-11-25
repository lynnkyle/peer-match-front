import instance from "../plugins/axios.ts";
import {showFailToast} from "vant";

export const listTeam = async (key = '', val = '') => {
    let param = null
    if (key != '') {
        param = {
            [key]: val
        }
    }
    const res = await instance.get('/team/list', {
        params: param
    })
    if (res?.code === 20000 && res.data) {
        return res.data
    } else {
        showFailToast(res?.description)
    }
    return null
}