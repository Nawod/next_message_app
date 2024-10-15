"use client";
/**
 * @class messageSlice
 * @description purpose of this slice is to manage message data
 * @author Nawod Madhuvantha
 */
import { DummyData } from "@/shared/constants/message";
import { MessageItem } from "@/shared/models/message";
import { createSlice } from "@reduxjs/toolkit";

interface MessageStates {
    messages : Array<MessageItem>,
    replyId ?: string,
    selectedMessage ?: MessageItem
}

const initialState : MessageStates = {
    messages : DummyData.MESSAGES,
};

const messageSlice = createSlice({
    name: "messages",
    initialState: initialState,
    reducers: {
        //add a new message
        sendMessage(state,action) {
            const tempList = state.messages;
            const message = action.payload;
            tempList.push(message)

            state.messages = tempList;
        },
        
        //delete a message
        deleteMessage(state,action) {
            const deleteMessageRecursively = (messages: MessageItem[], id: string): MessageItem[] => {
                return messages
                  .filter(message => message.id !== id) 
                  .map(message => ({
                    ...message,
                    reply: message.reply ? deleteMessageRecursively(message.reply, id) : undefined
                  }));
            }

            const tempList = deleteMessageRecursively(state.messages, action.payload);

            state.messages = tempList;
        },

        //edit a message
        editMessage(state,action) {
            const updateMessage = (messages: MessageItem[], id: string, newMessage: string): MessageItem[] => {
                return messages.map((message : MessageItem) => {
                  if (message.id === id) {
                    return { ...message, message: newMessage }; 
                  }
              
                  // Recursively update replies
                  if (message.reply) {
                    return { ...message, reply: updateMessage(message.reply, id, newMessage) };
                  }
              
                  return message;
                });
            }

            const tempList = updateMessage(state.messages, action.payload.id, action.payload.message);
            state.messages = tempList;
            state.selectedMessage = undefined;
        },

        //add a reply 
        sendReply(state,action) {
            const updateMessageList = (messages: MessageItem[], id: string, newReply: MessageItem): MessageItem[] => {
                return messages.map(message => {
                  if (message.id === id) {
                    return {
                        ...message,
                        reply: [...(message.reply || []), newReply]
                      };
                  }
              
                  // Recursively update replies
                  if (message.reply) {
                    return { ...message, reply: updateMessageList(message.reply, id, newReply) };
                  }
              
                  return message;
                });
            }

            const tempList = updateMessageList(state.messages, action.payload.messageId, action.payload.message);

            state.messages = tempList;
            state.replyId = undefined;
        },

        //change message priority
        changeMessagePriority(state,action) {
            const updateMessagePriority = (messages: MessageItem[], id: string,isPlus : boolean): MessageItem[] => {
                return messages.map((message : MessageItem) => {
                  if (message.id === id) {
                    return { ...message, priorityValue: Math.max(isPlus ? message.priorityValue + 1 :  message.priorityValue - 1,0)}; 
                  }
              
                  // Recursively update replies
                  if (message.reply) {
                    return { ...message, reply: updateMessagePriority(message.reply, id, isPlus) };
                  }
              
                  return message;
                });
            }

            const tempList = updateMessagePriority(state.messages, action.payload.messageId, action.payload.isPlus);

            state.messages = tempList;
        },

        //set reply id
        setReplyId(state,action){
            state.selectedMessage = undefined;
            state.replyId = action.payload;
        },

        //remove reply id
        removeReplyId(state){
            state.replyId = undefined;
        },

        //set edit id
        setEditMessage(state,action){
            state.replyId = undefined;
            state.selectedMessage = action.payload;
        },

        //remove edit id
        removeEditMessage(state){
            state.selectedMessage = undefined;
        }
    }
    });

    export const messageAction = messageSlice.actions;
    
    export default messageSlice;