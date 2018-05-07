var mongoose = require("mongoose");
const User = require("./user");
const Blog = require("./blog");

const commentSchema = mongoose.Schema({
    text: { type: String, required: true, maxLength: 300 },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    created: {
        type: Date, 
        default: Date.now
    }
});

commentSchema.pre('remove', async function(next) {
  try {
    //find a user
    let user = await User.findById(this.id);
    //remove the id of the comment from their list of comments
    user.comment.remove(this.id);
    //save that user
    await user.save();
    //return next
    return next();
  } catch (err) {
    return next(err);
  }
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;