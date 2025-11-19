import { request } from '~/utils/request'


// Response interface
export interface FindFriendRes {
    /* */
    code: number;

    /* */
    data: {
        /*好友id */
        id: number;


        /*好友头像 */
        avatar: string;

        /*好友用户名 */
        username: string;

        /*1:男，2:女，0:薛定谔的猫 */
        gender: number;

        /*用户简介 */
        introduction: string;

        /* 1:正常,2:拉黑*/
        friendStatus: number;

        /* 好友备注*/
        friendNickName: string;
        /* 是否在线*/
        onlineStatus: boolean;
    };

    /* */
    msg: string;
}


/**
 * 查找好友信息
 * @param {string} friendId
 * @returns
 */
export function findFriendByFriendId(friendId: number,){
    return request.get(`/app-api/im/friend/find/${friendId}`);
}


// Response interface
export interface ModifyFriendRes {
    /* */
    code: number;

    /* */
    data: string;

    /* */
    msg: string;
}

export interface FriendReqVO {
    /* */
    friendId: number;

    /* */
    nickName: string;

}

/**
 * 更新好友信息
 */
export function modifyFriend(params: FriendReqVO){
    return request.post(`/app-api/im/friend/modifyFriend`, params);
}


export interface DelFriendRes {
    /* */
    code: number;

    /* */
    data: string;

    /* */
    msg: string;
}

/**
 * 删除好友
 * @param {string} friendId
 * @returns
 */
export function delFriend(friendId:number) {
    return request.post(`/app-api/im/friend/delete/${friendId}`);
}

