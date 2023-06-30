import React, { createContext, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoute from "./routes/AppRoute";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import vi_VN from "antd/locale/vi_VN";

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
    <DataContext.Provider value={{ state, dispatch }}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins",
          },
        }}
        locale={vi_VN}
      >
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AppRoute />
          </QueryClientProvider>
        </BrowserRouter>
      </ConfigProvider>
    </DataContext.Provider>
  );
}

export default App;
