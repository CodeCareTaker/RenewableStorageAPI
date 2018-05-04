var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/renewablestorage");
mongoose.set("debug", true);
mongoose.Promise = Promise;

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("Comment", commentSchema);