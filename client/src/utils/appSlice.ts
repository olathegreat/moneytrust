import { createSlice } from "@reduxjs/toolkit";



interface AppState {

 mobileViewChatDisplay: boolean;
   
}

const initialState: AppState = {


    
    mobileViewChatDisplay: false
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
    
       
        setMobileViewChatDisplay: (state)=>{
            state.mobileViewChatDisplay = !state.mobileViewChatDisplay;
        }
    }
})

export const {  setMobileViewChatDisplay } = appSlice.actions;

export default appSlice.reducer;