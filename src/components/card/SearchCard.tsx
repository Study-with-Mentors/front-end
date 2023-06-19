import { Avatar, Input } from "antd";
import React, { useEffect, useState } from "react";
import styled from "./SearchCard.module.scss";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const SearchCard = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState<string>("");

  useEffect(() => {
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, []);

  const _handleKeyDown = (e: any) => {
    const searchInput = e.target.value;
    if (searchInput == "") return;
    navigate("/landing/course/search", {
      state: { searchInput },
    });
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
