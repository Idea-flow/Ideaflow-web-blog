import { request } from '~/utils/request'
import type {ListFriendMessageRes} from "~/remote/im/ImChatUserMessage";
export interface GroupMessageDTO {

    groupId: number;

    /* 发送内容 */
    content: string;

    /*消息内容类型 IMCmdType 0 文字 */
    type: number;

    // 发送者头像
    sendAvatar: string;
    // 发送者名称
    sendUserName: string;
}

// Response interface
export interface SendGroupMessageRes {
    /* */
    code: number;

    /* */
    data: {
        /*消息id */
        id: number;

        /*群聊id */
        groupId: number;

        /* 发送者id */
        sendId: number;

        /* 发送者头像 */
        sendAvatar: string;

        /* 发送者昵称 */
        sendNickName: string;

        /*消息内容 */
        content: string;

        /*消息内容类型 具体枚举值由应用层定义 */
        type: number;

        /*是否回执消息 */
        receipt: boolean;

        /*回执消息是否完成 */
        receiptOk: boolean;

        /*已读消息数量 */
        readedCount: number;

        /*@用户列表 */
        atUserIds: Record<string, unknown>[];

        /* 状态 */
        status: number;

        /*发送时间 */
        createTime: Record<string, unknown>;
    };

    /* */
    msg: string;
}



export function imChatGroupMessageSend(data : GroupMessageDTO){
    return request.post("/app-api/im/group-message/send", data);
}



export interface AppImChatUserGroupMessagePageReqVO {

    groupId: number;
    pageNo: number;
    pageSize: number;


}

// Response interface
export interface ListGroupMessagePageRes {
    /* */
    code: number;

    /* */
    data: {
        /*数据 */
        list: {
            /*id */
            id: number;

            /*群ID */
            groupId: number;

            /*发送ID */
            sendId: number;

            /*接收ID */
            recvId: number;

            /*内容 */
            content: string;

            /*创建时间 */
            sendTime: Record<string, unknown>;

            /* */
            avatar: string;

            /* */
            username: string;
        }[];

        /*总量 */
        total: number;
    };

    /* */
    msg: string;
}
export function imChatUserGroupMessageListGroupMessage(data: AppImChatUserGroupMessagePageReqVO) {
    return request.post("/app-api/im/group-message/listGroupMessage", data);
}

