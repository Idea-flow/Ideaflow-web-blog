import { request } from '~/utils/request'


export interface ListFriendMessageRes {
    /* */
    code: number;

    /* */
    data: {
        /*数据 */
        list: {
            /*id */
            id: number;

            /*发送ID */
            sendId: number;

            /*接收ID */
            recvId: number;

            /*内容 */
            content: string;

            /*内容 */
            type: number;

            /*内容 */
            status: number;

            /*创建时间 */
            sendTime: Record<string, unknown>;

            /* */
            avatar: string;
        }[];

        /*总量 */
        total: number;
    };

    /* */
    msg: string;
}

/**
 * 获得好友聊天记录
 * @param {string} fromId 发送ID
 * @param {string} toId 接收ID
 * @param {string} pageNo 页码，从 1 开始
 * @param {string} pageSize 每页条数，最大值为 100
 * @returns
 */
export function listFriendMessage(params: any) {
    return request.post("/app-api/im/private-message/listFriendMessage", params);
}

export interface SendMessageRes {
    /* */
    code: number;

    /* */
    data: {
        /* 消息id */
        id: number;

        /* 发送者id */
        sendId: number;

        /* 接收者id */
        recvId: number;

        /* 发送内容 */
        content: string;

        /*消息内容类型 IMCmdType */
        type: number;

        /* 状态 */
        status: number;

        /* 发送时间 */
        sendTime: Record<string, unknown>;

        /* 发送者头像 */
        sendAvatar: string;
    };

    /* */
    msg: string;
}

export interface PrivateMessageDTO {
    /* 接收者id */
    recvId: number;

    /* 发送内容 */
    content: string;

    /*消息内容类型 IMCmdType */
    type: number;

    sendAvatar: string;
}

export function imChatPrivateMessageSend(data : PrivateMessageDTO) {
    return request.post("/app-api/im/private-message/send", data);
}