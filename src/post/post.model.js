const knex = require("../knex");
const USERS_POST_TABLE = "users_post";

module.exports = {
  USERS_POST_TABLE,

  getAll(limit = 10) {
    return knex("users_post")
      .select({
        username: "users_post.username",
        description: "users_post.description",
      })
      .from(USERS_POST_TABLE)
      .limit(limit);
  },
};
