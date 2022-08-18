const postModel = require("./post.model");
const knex = require("../knex");
const USERS_POST_TABLE = "users_post";

module.exports = {
  async index(req, res) {
    const post = await postModel.getAll();
    res.render("pages/post/index", {
      post,
    });
  },
  async post(req, res) {
    await knex("users_post").insert([
      {
        username: req.body.username,
        description: req.body.description,
      },
    ]);

    res.send(
      '<p>投稿が完了しました</p><br><a href="/post">postページに戻る</a>'
    );
  },
};
