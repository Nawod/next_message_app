"use client";
/**
 * @class userSlice
 * @description purpose of this slice is to manage user data
 * @author Nawod Madhuvantha
 */
import { createSlice } from '@reduxjs/toolkit';
import { User } from "@/shared/models/user";

const getFromLocalStorage = () => {
    if(typeof window !== "undefined") { 
        const user = localStorage.getItem("currentUser");
        return user ? JSON.parse(user) : {
            id : 'c1235',
            name: 'juliusomo',
            image : '/users/p3.jpg'
        };
      }
    
};

interface UserStates {
    currentUser : User
}

const initialState : UserStates = {
    currentUser : getFromLocalStorage()
};

const userSlice = createSlice({
    name: "currentUser",
    initialState: initialState,
    reducers: {
    }
    });

    export const userAction = userSlice.actions;
    
    export default userSlice;