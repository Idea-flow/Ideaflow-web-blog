import { request } from '~/utils/request'

export interface AppChatListRep {
    /* */
    code: number;

    /* */
    data: {
        /* */
        id: number;

        /* */
        type: string;

        /* */
        name: string;

        /* */
        avatar: string;

        /* */
        lastMessage: string;

        /* */
        time: string;
    }[];

    /* */
    msg: string;
}

/**
 * 查询聊天列表
 * @returns
 */
export function findChatList(){
    return request.get(`/app-api/im/chat/list`);
}



export interface GetAllContactInfoRes {
    /* */
    code: number;

    /* */
    data: {
        /* */
        imContactGroupInfoList: {
            /* */
            id: string;

            /* */
            type: string;

            /* */
            name: string;

            /* */
            avatar: string;
        }[];

        /* */
        imContactFriendInfoList: {
            /* */
            id: string;

            /* */
            type: string;

            /* */
            name: string;

            /* */
            avatar: string;
        }[];
    };

    /* */
    msg: string;
}

/**
 * 查询所有聊天群和好友列表
 * @returns
 */
export function getAllContactInfo() {
    return request.get(`/app-api/im/chat/getAllContactInfo`);
}