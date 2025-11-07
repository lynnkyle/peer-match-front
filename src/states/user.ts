import type {UserType} from "../models/user";

let currentUser: UserType

const getCurrentUserState = (): UserType => {
    return currentUser
}
const setCurrentUserState = (user: UserType) => {
    currentUser = user
}
export {
    getCurrentUserState,
    setCurrentUserState
}