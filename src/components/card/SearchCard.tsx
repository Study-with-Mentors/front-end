import { Avatar, Input } from "antd";
import React, { useEffect, useState } from "react";
import SearchIcon from "../../assets/icon-search.svg";
import styled from "./SearchCard.module.scss";
import { useNavigate } from "react-router-dom";

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
    navigate("/home/search/course", {
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
            <img className={styled["search-icon"]} src={SearchIcon} />
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
