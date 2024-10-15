/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { Provider } from "react-redux";
import  {store}  from './store';

export function Providers({children}) {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}