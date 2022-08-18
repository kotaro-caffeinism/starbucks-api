/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.schema.raw("SELECT SETVAL ('shop_id_seq', 1, false)");
  await knex.schema.raw("SELECT SETVAL ('category_id_seq', 1, false)");
  await knex.schema.raw("SELECT SETVAL ('beverage_id_seq', 1, false)");
  await knex("shop").del();
  await knex("category").del();
  await knex("beverage").del();
  await knex("category").insert([
    {
      name: "コーヒー",
    },
    {
      name: "フラペチーノ®",
    },
    {
      name: "エスプレッソ",
    },
    {
      name: "ティー | TEAVANA™",
    },
  ]);
  await knex("shop").insert([
    {
      shop: "STARBUCKS RESERVE® ROASTERY TOKYO",
    },
    {
      shop: "STARBUCKS Tea & Café",
    },
  ]);
  await knex("beverage").insert([
    {
      name: "石川 いいじ 棒ほうじ茶 フラペチーノ",
      category: 2,
      isSeasonal: true,
    },
    {
      name: "山梨 ててっ!! ぶどう ホワイト チョコレート クリーム フラペチーノ",
      category: 2,
      isSeasonal: true,
    },
    {
      name: "沖縄 かりー ちんすこう バニラ キャラメル フラペチーノ",
      category: 2,
      isSeasonal: true,
    },
    {
      name: "バレルエイジド コールド ブリュー",
      category: 1,
      shop: 1,
    },
    {
      name: "スターバックス ラテ",
      category: 3,
    },
    {
      name: "ソイ ラテ",
      category: 3,
    },
    {
      name: "アーモンドミルク ラテ",
      category: 3,
    },
    {
      name: "ムースフォーム ラテ",
      category: 3,
    },
    {
      name: "カフェ アメリカーノ",
      category: 3,
    },
    {
      name: "エスプレッソ",
      category: 3,
    },
    {
      name: "チャイティーラテ",
      category: 4,
    },
    {
      name: "ストロベリー & パッション ティー フラペチーノ®",
      category: 2,
      shop: 2,
    },
    {
      name: "めんつゆ",
      category: 1,
      shop: 1,
      isSeasonal: true,
    },
  ]);
};
