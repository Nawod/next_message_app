"use client"
import { messageAction } from '@/app/store/messageSlice';
import { EditPriority } from '@/shared/models/message';
/**
 * @class Counter
 * @description purpose of this component is to add and min values
 * @author Nawod Madhuvantha
 */

import React from 'react'
import { useDispatch } from 'react-redux';

interface Props {
    value : number;
    messageId : string;
}

export const Counter =({value,messageId} : Readonly<Props>) => {
  const dispatch = useDispatch();

  const changePriories = (isPlus : boolean) => {
      const values : EditPriority = {
        messageId : messageId,
        isPlus : isPlus
      }
      dispatch(messageAction.changeMessagePriority(values))
  }

  return (
    <div className='rounded-md p-2 bg-purple-50 h-fit flex flex-col items-center justify-items-center'>
      <div className='text-purple-300 hover:text-purple-600 cursor-pointer basis-1' onClick={()=>{changePriories(true)}}>
        +
      </div>
      <div className='text-purple-700 font-semibold text-sm basis-1'>
        {value}
      </div>
      <div className='text-purple-300 hover:text-purple-600 cursor-pointer basis-1' onClick={()=>{changePriories(false)}}>
        -
      </div>
    </div>
  )
}
