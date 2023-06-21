import React, { createContext, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import LeftSideBar from "./components/sidebar/LeftSideBar";
import CourseCard from "./components/card/CourseCard";
import LoginForm from "./components/form/LoginForm";
import AppTable from "./components/table/AppTable";
import AppRoute from "./routes/AppRoute";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export enum ActionEnum {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
}

export type ActionType = {
  type: ActionEnum;
  payload: {
    value: number;
  };
};

type ContextType = {
  state: { data: number };
  dispatch: (action: ActionType) => void;
};

const reducer = (state: { data: number }, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "INCREMENT": {
      return {
        ...state,
        data: state.data + payload.value,
      };
    }
    case "DECREMENT": {
      return {
        ...state,
        data: state.data - payload.value,
      };
    }
    default:
      return state;
  }
};

export const DataContext = createContext<ContextType>({
  state: { data: 0 },
  dispatch: (action: {}) => {},
});

function App() {
  const [state, dispatch] = useReducer(reducer, {
    data: 0,
  });

  return (
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
  );
}

export default App;
