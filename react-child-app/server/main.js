import { Meteor } from "meteor/meteor";
import { MongoInternals } from "meteor/mongo";

// connection = DDP.connect("http://localhost:5001");

Meteor.startup(() => {
  let foods = MongoInternals.defaultRemoteCollectionDriver().open("foods");
  console.log(foods);
  // console.log(Mongo.Collection.get("foods").insert({ name: "test" }));
  // console.log(
  //   Mongo.Collection.get("foods", { connection: connection }).find({}).fetch()
  // );
  //CORS
  // WebApp.rawConnectHandlers.use(function (req, res, next) {
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000/");
  //   res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
  //   return next();
  // });
  // var fs = Npm.require("fs");
  // __ROOT_APP_PATH__ = fs.realpathSync(".");
  // console.log("path:");
  // console.log(__ROOT_APP_PATH__);
});
