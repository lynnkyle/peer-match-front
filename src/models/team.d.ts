import type {UserType} from "./user";

export type TeamType = {
    id?: number;
    teamName?: string;
    description?: string;
    userId?: number;
    maxNum?: number;
    expireTime?: string;
    teamStatus?: number;
    createUser?: UserType;
    members?: UserType[];
    hasJoin?: boolean;
    createTime?: string;
    updateTime?: string;
};