import React from "react";
import "./Favourite.scss";
import { Link } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { addFavouriteMeals } from "../../actions/mealsActions";
import { useMealContext } from "../../context/mealContext";

const FavouriteList = () => {
  const { dispatch, meals, favourite } = useMealContext();

  return (
    <div className="section-wrapper">
      <div className="container">
        <div className="sc-title">favourite meals</div>
        <section className="sc-meal grid">
          {favourite?.map((mealItem) => {
            const {
              idMeal: id,
              strArea: area,
              strCategory: category,
              strMeal: meal,
              strMealThumb: thumbnail,
            } = mealItem;

            return (
              <>
                <Link
                  to={`/meal/${id}`}
                  className="meal-itm align-center justify-center"
                  key={id}
                >
                  <div className="meal-itm-img">
                    <img src={thumbnail} alt={meal} />
                    <div className="meal-itm-cat bg-orange text-orange fw-6">
                      {category}
                    </div>
                  </div>

                  <div className="meal-itm-body">
                    <div className="meal-itm-body-info flex flex-column">
                      <div className="area fs-14 ls-1 fw-5">{area}</div>
                      <div className="meal fw-15 fw-7 op-09">{meal}</div>
                      <button
                        className="like-btn justify-end"
                        onClick={(e) => {
                          e.preventDefault();
                          addFavouriteMeals(dispatch, favourite, meals, id);
                        }}
                      >
                        <BsHeartFill />
                      </button>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default FavouriteList;
