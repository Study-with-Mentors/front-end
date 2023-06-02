import React from "react";
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

function App() {
  return (
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
  );
}

export default App;
