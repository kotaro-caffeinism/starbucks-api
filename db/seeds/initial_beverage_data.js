/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.schema.raw("SELECT SETVAL ('beverage_id_seq', 1, false)");
  await knex("beverage").del();
  await knex("beverage").insert([
    {
      name: "石川 いいじ 棒ほうじ茶 フラペチーノ",
      category: "フラペチーノ®",
      isSeasonal: true,
    },
    {
      name: "山梨 ててっ!! ぶどう ホワイト チョコレート クリーム フラペチーノ",
      category: "フラペチーノ®",
      isSeasonal: true,
    },
    {
      name: "沖縄 かりー ちんすこう バニラ キャラメル フラペチーノ",
      category: "フラペチーノ®",
      isSeasonal: true,
    },
    {
      name: "バレルエイジド コールド ブリュー",
      category: "コーヒー",
      shop: "STARBUCKS RESERVE® ROASTERY TOKYO",
    },
    {
      name: "スターバックス ラテ",
      category: "エスプレッソ",
    },
    {
      name: "ソイ ラテ",
      category: "エスプレッソ",
    },
    {
      name: "アーモンドミルク ラテ",
      category: "エスプレッソ",
    },
    {
      name: "ムースフォーム ラテ",
      category: "エスプレッソ",
    },
    {
      name: "カフェ アメリカーノ",
      category: "エスプレッソ",
    },
    {
      name: "エスプレッソ",
      category: "エスプレッソ",
    },
    {
      name: "チャイティーラテ",
      category: "ティー | TEAVANA™",
    },
    {
      name: "ストロベリー & パッション ティー フラペチーノ®",
      category: "フラペチーノ®",
      shop: "STARBUCKS Tea & Café",
    },
  ]);
};
