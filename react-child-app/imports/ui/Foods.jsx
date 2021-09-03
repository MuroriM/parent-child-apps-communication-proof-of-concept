import React from "react";
import { FoodsCollection } from "/public/sharedCollections";
import { Food } from "/imports/ui/Food";

export const Foods = () => {
  const foods = FoodsCollection.find({}).fetch();

  const deleteFood = ({ _id }) => {
    FoodsCollection.remove(_id);
  };
  return (
    <div>
      <h2>Foods Collection:</h2>
      <ul>
        {foods.map((food) => (
          <Food key={food._id} food={food} onDeleteClick={deleteFood} />
        ))}
      </ul>
    </div>
  );
};
