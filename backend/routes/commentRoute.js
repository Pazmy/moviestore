const CommentController = require("../controllers/CommentController");
const commentRoute = require("express").Router();

// commentRoute.get("/:id",CommentController.getAllCommentMovie)
commentRoute.post("/add", CommentController.addComment);

module.exports = commentRoute;
