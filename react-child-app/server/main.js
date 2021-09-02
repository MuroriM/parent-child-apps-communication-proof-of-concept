import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
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
