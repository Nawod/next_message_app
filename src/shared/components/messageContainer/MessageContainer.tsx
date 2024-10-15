"use client"
/**
 * @class MessageContainer
 * @description purpose of this component is to retrieve and visualized messages
 * @author Nawod Madhuvantha
 */

import { MessageItem } from '@/shared/models/message';
import React, { useEffect } from 'react'
import { MessageBlock } from '../messageBlock/MessageBlock';

interface MessageProps {
    messages : MessageItem[]
}
export const MessageContainer = ({messages} : MessageProps) => {
    /**
     * set user
     */
    useEffect(()=>{
        localStorage.setItem("currentUser", JSON.stringify({
            id : 'c1235',
            name: 'juliusomo',
            image : '/users/p3.jpg'
        }));
    },[])

  return (
    messages.slice().sort((a : MessageItem, b : MessageItem) => b.priorityValue - a.priorityValue).map((message : MessageItem) => (
        <div className="messageBlock" key={message.id}>
            <MessageBlock message={message} />
            <div className="flex flex-col gap-4 mt-4 ml-8 border-l-2">
                {
                    message.reply && (
                        <div className='pl-8'>
                            <MessageContainer messages={message.reply} />
                        </div>
                    )
                }
            </div>
        </div>
    ))
  )

}
