import { Meteor } from "meteor/meteor";
import { FoodsCollection } from "/imports/db/FoodsCollection";
import "/imports/api/foodsPublication";

//function to insert foods into food collection
const insertFood = (foodName) => {
  FoodsCollection.insert({
    name: foodName,
    createdAt: new Date(),
  });
};

Meteor.startup(() => {
  // CORS
  // WebApp.rawConnectHandlers.use(function (req, res, next) {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  //   return next();
  // });

  //populate foods collection
  if (FoodsCollection.find().count() == 0) {
    [
      "Blueberries",
      "Raspberries",
      "Blackberries",
      "Strawberries",
      "Cranberries",
    ].forEach((foodName) => insertFood(foodName));
  }
});
