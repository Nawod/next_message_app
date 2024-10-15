"use client"
/**
 * @class MessageBlock
 * @description purpose of this component is render a message
 * @author Nawod Madhuvantha
 */

import React from 'react'
import { MessageItem } from '@/shared/models/message';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { FaReply,FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Time } from '@/shared/models/time';
import { messageAction } from '@/app/store/messageSlice';
import { RootState } from '@/app/store/store';
import { Counter } from '../counter/Counter';

interface Props {
    message : MessageItem;
    replyUser ? : string;
}

export const MessageBlock = ({message, replyUser} : Readonly<Props>) => {

    const {currentUser} = useSelector( ( state : RootState ) => state.userStates ); 
    const {replyId , selectedMessage}  = useSelector((state : RootState)=> state.messageStates);

    const dispatch = useDispatch();

    /**
     * delete a message
     */
    const deleteMessage = () => {
        if (window.confirm('Are you sure you want to delete this comment ?')){
            dispatch(messageAction.deleteMessage(message.id))
        }
    }

    /**
     * set reply id
     */
    const setReplyId = () => {
        if(replyId === message.id){
            dispatch(messageAction.removeReplyId())
        } else {
            dispatch(messageAction.setReplyId(message.id));
        }
    }

    /**
     * set edit id
     */
    const setEditMessage = () => {
        if(selectedMessage?.id === message.id){
            dispatch(messageAction.removeEditMessage())
        } else {
            dispatch(messageAction.setEditMessage(message));
        }
    }

  return (
    <div className={`flex flex-row gap-4 bg-white rounded-lg border-2 p-4 ${
            (replyId === message.id || selectedMessage?.id === message.id) ? 'border-purple-700' : 'border-transparent'
            }`}>
      <Counter value={message.priorityValue} messageId={message.id} /> 
      <div className='w-full'>
        <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-4'>
                <div className='rounded-full size-6 object-cover relative' >
                    <Image src={message.user.image} alt='user image' fill sizes='24' className='rounded-full'/>
                </div>
                <div className="font-semibold text-black">
                    {message.user.name}
                </div>
                {currentUser?.id === message.user.id && <div className="bg-purple-700 text-white rounded-sm px-1 text-xs font-medium">
                    you
                </div>}
                <div className="text-gray-500">
                    {Time.timeAgo(new Date(message.updatedAt))}
                </div>
            </div>
            {
                currentUser?.id === message.user.id ? 
                (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-red-600 hover:text-red-500 cursor-pointer font-medium" onClick={deleteMessage}>
                            <MdDelete />
                            Delete
                        </div>
                        <div className="flex items-center gap-2 text-purple-700 hover:text-purple-500 cursor-pointer font-medium" onClick={setEditMessage}>
                            <FaPen />
                            Edit
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-purple-700 hover:text-purple-500 cursor-pointer font-medium" onClick={setReplyId}>
                        <FaReply />
                        Reply
                    </div>
                )
            }
        </div>
        <div className='text-gray-500'>
            {replyUser &&
                <span className='text-purple-700 font-semibold'>
                    {`@${replyUser} `} 
                </span>
            }
            {message.message}
        </div>
      </div>
    </div>
  )
}
