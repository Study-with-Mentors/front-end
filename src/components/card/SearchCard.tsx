import { Avatar, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styled from "./SearchCard.module.scss";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { ActionEnum, DataContext } from "../../App";

const SearchCard = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(DataContext);

  const [inputData, setInputData] = useState<string>("");

  useEffect(() => {
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, []);

  const _handleKeyDown = (e: any) => {
    const searchInput = e.target.value;
    if (searchInput == "") return;
    dispatch({ type: ActionEnum.SET, payload: { value: searchInput } });
    navigate("/course/search");
  };
  return (
    <div className={styled["container"]}>
      <Input
        className={styled["input"]}
        size="large"
        prefix={
          <div className={styled["search-container"]}>
            <SearchIcon className={styled["search-icon"]} />
          </div>
        }
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onPressEnter={_handleKeyDown}
        placeholder="Search anything!"
        bordered={false}
      />
    </div>
  );
};

export default SearchCard;
