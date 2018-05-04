var mongoose              = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost/renewablestorage");
mongoose.set("debug", true);
mongoose.Promise = Promise;

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);