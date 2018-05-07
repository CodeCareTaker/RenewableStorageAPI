const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/renewablestorage", {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Blog = require("./blog");
module.exports.Comment = require("./comment");