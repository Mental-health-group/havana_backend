const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { author, content } = req.body;

    const newPost = new Post({
      author,
      content,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.reactToPost = async (req, res) => {
  try {
    const { postId, reaction } = req.body;

    await Post.findByIdAndUpdate(postId, {
      $addToSet: { reactions: reaction },
    });

    res.status(200).json({ message: "Reaction added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
