const Post = require("../models/Post");

exports.createPost = async (author, content) => {
  try {
    const newPost = new Post({ author, content });

    await newPost.save();

    return newPost;
  } catch (error) {
    throw error;
  }
};

exports.getAllPosts = async () => {
  try {
    const posts = await Post.find().populate("author", "name");

    return posts;
  } catch (error) {
    throw error;
  }
};

exports.reactToPost = async (postId, reaction) => {
  try {
    await Post.findByIdAndUpdate(postId, {
      $addToSet: { reactions: reaction },
    });
  } catch (error) {
    throw error;
  }
};
