import { Avatar, Input } from "antd";
import React from "react";
import SearchIcon from "../../assets/icon-search.svg";
import styled from "./SearchCard.module.scss";

const SearchCard = () => {
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
        placeholder="Search anything!"
        bordered={false}
      />
    </div>
  );
};

export default SearchCard;
