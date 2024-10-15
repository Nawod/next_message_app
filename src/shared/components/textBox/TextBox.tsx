"use client"
/**
 * @class TextBox
 * @description purpose of this component is send and edit messages
 * @author Nawod Madhuvantha
 */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { EditReply, MessageItem, SendMessage } from '@/shared/models/message';
import { UniqueId } from '@/shared/models/uniqueId';
import { messageAction } from '@/app/store/messageSlice';
import { RootState } from '@/app/store/store';
import Image from 'next/image';

export const TextBox = () => {
    const {currentUser} = useSelector( ( state : RootState ) => state.userStates ); 
    const {replyId , selectedMessage}  = useSelector((state : RootState)=> state.messageStates);

    const dispatch = useDispatch();

    const { register, handleSubmit,reset,setValue, formState: { errors } } = useForm<SendMessage>()

    /**
     * submit a comment
     * @param data 
     */
    const onSubmit = (data : SendMessage) => {
        const message : MessageItem = {
            id : UniqueId.getUniqueId(),
            user : currentUser,
            message : data.message,
            updatedAt : new Date().toISOString(),
            priorityValue : 0
        };

        if(replyId){
            const value : EditReply = {
                messageId : replyId,
                message : message
            }
            dispatch(messageAction.sendReply(value));
        } else if(selectedMessage){
            const value : SendMessage = {
                id : selectedMessage.id,
                message : message.message
            }
            dispatch(messageAction.editMessage(value));
        } else {
            dispatch(messageAction.sendMessage(message));
        }
        reset();
    };

    useEffect(()=>{
        if(selectedMessage){
            setValue('message', selectedMessage.message)
        } else {
            reset();
        }
    },[reset, selectedMessage, setValue])

  return (
    <div className='flex gap-4 rounded-lg p-4 bg-white'>
        <div className='relative size-8 rounded-full'>
        {currentUser?.image && <Image src={currentUser.image} alt='user' fill className='rounded-full object-cover' sizes='32' />}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 w-full'>
            <textarea {...register("message", { required: true})} className={`resize-none border-2 rounded-md w-full h-24 py-4 px-7 outline-none ${
            errors.message ? 'border-red-500' : 'border-gray-200'
            }`} placeholder='Add a comment...'/>

            <input type="submit" className='text-white bg-purple-700 hover:bg-purple-500 cursor-pointer font-semibold h-fit rounded-md py-3 px-7 uppercase' value='Send' />
        </form>
    </div>
  )
}
