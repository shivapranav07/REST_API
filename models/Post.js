const mongoose = require("mongoose");

// Define the post schema
const PostSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [
      {
        userId: {
          type: String,
          required: true,
        },
        commentText: {
          type: String,
          required: true,
        },
        // You can include other fields like timestamps, likes, etc. if needed
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
