import { createSlice } from "@reduxjs/toolkit";
import userData from "../../data/user";
const userSlice = createSlice({
    name: "users",
    initialState: { user: [] },
    reducers: {
        getUserData: (state) => {
            if (state.user?.length == 0) {
                console.log("Inner Called")
                state.movie = userData;
            }
            console.log("Outer Called")
        },

        newUser: (state, action) => {
            console.log("New User : ", action.payload)
            state.user.push(action.payload)
            console.log("User Added !")
        },

        updateUser: (state, action) => {
            console.log("New Data : ", action.payload)
            
            // HAMESHA oldEmail se user find karo
            let actualEmail = action.payload.oldEmail;
            
            for (let i = 0; i < state.user.length; i++) {
                if (state.user[i].email == actualEmail) {
                    state.user[i] = {
                        ...state.user[i],
                        email: action.payload.email,
                        firstname: action.payload.firstname,
                        lastname: action.payload.lastname,
                        age: action.payload.age,
                        bio: action.payload.bio
                    }
                    // Ye line remove karo, duplicate hai
                    // state.user[i].email = action.payload.email
                }
            }
        }

    }
})

export const { getUserData, newUser, updateUser, decrement } = userSlice.actions;
export default userSlice.reducer;