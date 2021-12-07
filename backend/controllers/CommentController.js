const { Comment, User } = require("../models");

class CommentController {
  static async getAllCommentMovie(req, res) {
    let data = await Comment.findAll({ include: [User] });
    data = data.map((i) => {
      const date = i.createdAt.slice(0, 11);
      console.log(date);
      return { comment: i.comment, rate: i.rate };
    });
  }
  static async addComment(req, res) {
    try {
      const { rate, comment, MovieId, email } = req.body;
      const UserId = await User.findOne({ where: { email } });
      //   console.log(UserId.id);
      await Comment.create({ rate, comment, MovieId, UserId: UserId.id });
      res.status(201).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = CommentController;
