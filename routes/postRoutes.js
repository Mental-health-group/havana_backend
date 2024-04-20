const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);

router.post("/create", postController.createPost);

router.post("/:postId/react", postController.reactToPost);

module.exports = router;
