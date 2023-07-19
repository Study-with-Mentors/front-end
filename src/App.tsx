import React, { createContext, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoute from "./routes/AppRoute";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export enum ActionEnum {
  SET = "SET",
}

export type ActionType = {
  type: ActionEnum;
  payload: {
    value: string;
  };
};

type ContextType = {
  state: { data: string };
  dispatch: (action: ActionType) => void;
};

const reducer = (state: { data: string }, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "SET": {
      return {
        ...state,
        data: payload.value,
      };
    }
    default:
      return state;
  }
};

export const DataContext = createContext<ContextType>({
  state: { data: "" },
  dispatch: (action: {}) => {},
});

function App() {
  const [state, dispatch] = useReducer(reducer, {
    data: "",
  });

  return (
    // <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <DataContext.Provider value={{ state, dispatch }}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Poppins",
            },
          }}
        >
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <AppRoute />
            </QueryClientProvider>
          </BrowserRouter>
        </ConfigProvider>
      </DataContext.Provider>
    // </GoogleOAuthProvider>
  );
}

export default App;
