import { request } from '~/utils/request'


export interface FindGroupRes {
    /* */
    code: number;

    /* */
    data: {
        /*群id */
        id: number;

        /*群名称 */
        name: string;

        /* */
        groupOwnerInfo: {
            /* */
            ownerId: number;

            /* */
            ownerUserName: string;

            /* */
            ownerUserAvatar: string;
        };

        /*头像 */
        headImage: string;

        /*群公告 */
        notice: string;
        /*群成员数量 */
        memberCount: string;
    };

    /* */
    msg: string;
}


/**
 * 查找群信息
 * @returns
 * @param groupId
 */
export function findGroupByGroupId(groupId: number,) {
    return request.get(`/app-api/im/group/find/${groupId}`);
}


export interface FindGroupMembersRes {
    /* */
    code: number;

    /* */
    data: {
        /*用户id */
        userId: number;

        /*用户昵称 */
        userName: string;

        /*是否管理员 */
        adminFlag: number;

        /*群内显示名称 */
        showNickName: string;

        /*群内昵称备注 */
        remarkNickName: string;

        /*头像 */
        headImage: string;


        /*是否在线 */
        online: boolean;

    }[];

    /* */
    msg: string;
}

/**
 * 查询群聊成员
 * @param {string} groupId
 * @returns
 */
export function findGroupMembers(groupId: number) {
    return request.get(`/app-api/im/group/members/${groupId}`);
}
