import dayjs from "dayjs";
import type {UnwrapRef} from "vue";
import type {TeamType} from "../models/team";

/**
 * 格式化日期
 * @param dateISOString
 */
export function formatDate(dateISOString: UnwrapRef<TeamType["expireTime"]>) {
    if (dateISOString === "") {
        return undefined
    }
    const dateTime = dayjs(dateISOString)
    return dateTime.format('YYYY-MM-DD')
}

/**
 * 修改日期
 * @param dateISOString
 * @param year
 * @param month
 * @param day
 */
export function modifyDate(dateISOString: UnwrapRef<TeamType["expireTime"]>, [year, month, day]: [number, number, number]) {
    if (dateISOString === "") {
        dateISOString = dayjs().toISOString()
    }
    const dateTime = dayjs(dateISOString).year(year).month(month - 1).date(day)
    return dateTime.toISOString()
}

/**
 * 格式化时间
 * @param dateISOString
 */
export function formatTime(dateISOString: UnwrapRef<TeamType["expireTime"]>) {
    if (dateISOString === "") {
        return undefined
    }
    const dateTime = dayjs(dateISOString)
    return dateTime.format('HH:mm:ss')
}

/**
 * 修改时间
 * @param dateISOString
 * @param hour
 * @param minute
 * @param second
 */
export function modifyTime(dateISOString: UnwrapRef<TeamType["expireTime"]>, [hour, minute, second]: [number, number, number]) {
    if (dateISOString === "") {
        dateISOString = dayjs().toISOString()
    }
    const dateTime = dayjs(dateISOString).hour(hour).minute(minute).second(second)
    return dateTime.toISOString()
}

/**
 * 格式化日期时间
 * @param dateISOString
 */
export function formatDateTime(dateISOString: UnwrapRef<TeamType["expireTime"]>) {
    if (dateISOString === "") {
        return undefined
    }
    const dateTime = dayjs(dateISOString)
    return dateTime.format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 抽取日期时间字段
 * @param dateISOString
 */
export function extractDateTimeField(dateISOString: UnwrapRef<TeamType["expireTime"]>) {
    const dateTime = dayjs(dateISOString)
    return {
        'year': dateTime.year().toString(),
        'month': (dateTime.month() + 1).toString(),
        'day': dateTime.date().toString(),
        'hour': dateTime.hour().toString(),
        'minute': dateTime.minute().toString(),
        'second': dateTime.second().toString()
    }
}

export function datePickerMinMax() {
    const dateTime = new Date()
    return {
        'min': dayjs(dateTime).toDate(),
        'max': dayjs(dateTime).add(2, 'year').toDate()
    }
}

