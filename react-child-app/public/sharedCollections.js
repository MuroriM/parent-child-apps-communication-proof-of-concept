import { Mongo } from "meteor/mongo";
import { MongoInternals } from "meteor/mongo";

let driver = null;

// export const FoodsCollection = new Mongo.Collection("foods");
if (Meteor.isServer) {
  driver = new MongoInternals.RemoteCollectionDriver(
    "mongodb://localhost:5001/meteor",
    { oplogUrl: "mongodb://localhost:5001/local" }
  );
}
export const FoodsCollection = new Mongo.Collection("foods", {
  _driver: driver,
});
