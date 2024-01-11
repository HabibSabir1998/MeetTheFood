import React, { useState, useEffect } from "react";
import "./Header.scss";
import { BsSearch } from "react-icons/bs";
import { PiShootingStarBold } from "react-icons/pi";
import { useMealContext } from "../../context/mealContext";
import { useNavigate } from "react-router-dom";
import {
  startFetchMealsBySearch,
  startFetchRandomCategories,
} from "../../actions/mealsActions";

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { dispatch, meals } = useMealContext();

  const handleSearchTerm = (e) => {
    e.preventDefault();
    if (e.target.value.replace(/[^\w\s]/gi, "").length !== 0) {
      setSearchTerm(e.target.value);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid search term ...");
    }
  };

  const handleSearchResult = (e) => {
    e.preventDefault();
    navigate("/");
    startFetchMealsBySearch(dispatch, searchTerm);
  };

  const handleRandomSearch = (e) => {
    e.preventDefault();
    navigate("/");
    startFetchRandomCategories(dispatch);
  };

  return (
    <form
      className="search-form flex align-center"
      onSubmit={(e) => handleSearchResult(e)}
    >
      <input
        type="text"
        className="form-control-input text-dark-gray fs-15"
        placeholder="Search recipes here ..."
        onChange={(e) => handleSearchTerm(e)}
      />
      <button
        type="submit"
        className="form-submit-btn text-white text-uppercase fs-14"
      >
        <BsSearch className="btn-icon" size={20} />
      </button>
      <button
        className="form-submit-btn text-white text-uppercase fs-14 mx-2"
        onClick={(e) => handleRandomSearch(e)}
      >
        <PiShootingStarBold className="btn-icon" size={20} title="surprise">
          Surprise
        </PiShootingStarBold>
      </button>
    </form>
  );
};

export default SearchForm;
