/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.schema.raw("SELECT SETVAL ('users_post_id_seq', 1, false)");
  await knex("users_post").del();
  await knex("users_post").insert([
    {
      id: 1,
      username: "Eriko",
      description:
        "Let's check your favorite フラペ！ 👉 https://sbux-47pref.surge.sh/posts/116",
    },
    { id: 2, username: "Kotaro", description: "ムースフォームラテがおいしい" },
  ]);
};
