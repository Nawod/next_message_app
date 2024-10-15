import { User } from "./user";

export interface MessageItem {
    id : string,
    user:User,
    updatedAt : string,
    priorityValue : number,
    message : string,
    reply? : Array<MessageItem>
}

export interface SendMessage {
    message : string;
    id? : string
}

export interface EditReply {
    messageId : string;
    message ?: MessageItem;
    replyId ?: string;
    reply ?: string;
}

export interface EditPriority {
    messageId : string;
    replyId ?: string;
    isPlus : boolean;
}