import React, { useState } from "react";
import { FoodsCollection } from "/public/sharedCollections";
import { Food } from "/imports/ui/Food";
import { useTracker } from "meteor/react-meteor-data";

export const Foods = () => {
  const foods = useTracker(() => FoodsCollection.find({}).fetch());

  //sanity check
  console.log(foods);

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
