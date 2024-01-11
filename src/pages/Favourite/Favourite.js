import React from "react";
import "./Favourite.scss";
import { useMealContext } from "../../context/mealContext";
import Loader from "../../components/Loader/Loader";
import CategoryList from "../../components/Category/CategoryList";
import NotFound from "../../components/NotFound/NotFound";
import FavouriteList from "../../components/Favourite/FavouriteList";

const Favourite = () => {
  const { categories, favourite, categoryLoading } =
    useMealContext();

  return (
    <main className="main-content">
      {favourite === null ? (
        <NotFound />
      ) : favourite?.length ? (
        <FavouriteList />
      ) : (
        ""
      )}
      {categoryLoading ? <Loader /> : <CategoryList categories={categories} />}
    </main>
  );
};

export default Favourite;
