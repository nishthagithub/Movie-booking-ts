import { createSlice } from "@reduxjs/toolkit";

interface userData {
  name: string;
  phnnumber: number;
  email?: string;
}

// interface authState {
//   user: userData | null;
//   token: number | null;
//   isAuthenticated: boolean;
// }

const storedUserData = localStorage.getItem("userData");

const storedAuthStatus = JSON.parse(
  localStorage.getItem("isAuthenticated") || "false"
);

const initialState = {
  user: storedUserData ? JSON.parse(storedUserData) : null,
  token: null,
  isAuthenticated: storedAuthStatus,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //     loginSuccess(state, action) {
    //     const user = action.payload; // Directly get user data
    //     if (!user) {
    //         console.error("User data is missing.");
    //         return;
    //     }
    //     state.user = user;

    //     if (
    //         state.user.email === user.email &&
    //         state.user.password === user.password
    //     ) {
    //         console.log("Login Successful");
    //         localStorage.setItem("isAuthenticated", "true");
    //         state.isAuthenticated = true;
    //     } else {
    //         console.log("Login failed");
    //     }
    // },
   loginSuccess(state, action) {
  const { userID, email } = action.payload;

  state.user = userID;
  state.isAuthenticated = true;

  localStorage.setItem("userId", String(userID));
  localStorage.setItem("email", email); // now a proper string!
  localStorage.setItem("isAuthenticated", "true");
},


    // signUpSuccess(state, action) {
    //   state.user = action.payload.user || null;
    //   state.token = action.payload.token || null;
    //   console.log(state.user, action.payload.user, action.payload);
    //   localStorage.setItem("userData", JSON.stringify(state.user));
    //   localStorage.setItem(
    //     "isAuthenticated",
    //     JSON.stringify(state.isAuthenticated)
    //   );
    // },
    addStep1Data(state, action) {
      state.user = {
        ...state.user,
        email: action.payload.email,
        phnnumber: action.payload.phnnumber,
      };
      localStorage.setItem("userData", JSON.stringify(state.user));
    },
    addStep2Data(state, action) {
      if (state.user) {
        state.user.password = action.payload.password;
        state.user.cpassword = action.payload.cpassword;
        localStorage.setItem("userData", JSON.stringify(state.user));
      }
    },
    setToken(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    // addPassword(state, action) {
    //   if (state.user) {
    //     state.user.password = action.payload.password;
    //     state.user.cpassword = action.payload.cpassword;
    //     localStorage.setItem("userData", JSON.stringify(state.user));
    //   }
    // },
    // addEmail(state, action) {
    //   state.user = { ...state.user, email: action.payload };
    //   localStorage.setItem("userData", JSON.stringify(state.user));
    // },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userId");
      localStorage.removeItem("isAuthenticated");

    },
  },
});

export const { loginSuccess, logout, addStep1Data,addStep2Data,setToken } =
  authSlice.actions;
export default authSlice.reducer;
