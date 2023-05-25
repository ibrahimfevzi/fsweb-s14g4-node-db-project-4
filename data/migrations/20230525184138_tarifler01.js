/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema
    .createTable("tarifler", (t) => {
      t.increments("tarif_id");
      t.string("tarif_adi").notNullable().unique();
      t.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
    })
    .createTable("adimlar", (t) => {
      t.increments("adim_id");
      t.string("adim_talimati").notNullable();
      t.integer("adim_sirasi").notNullable().unsigned();
      t.integer("tarif_id")
        .notNullable()
        .references("tarif_id")
        .inTable("tarifler");
    })
    .createTable("icindekiler", (t) => {
      t.increments("icindekiler_id");
      t.string("icindekiler_adi");
    })
    .createTable("icindekiler_adimlar", (t) => {
      t.increments("icindekiler_adimlar_id");
      t.integer("adim_id").references("adim_id").inTable("adimlar");
      t.decimal("miktar").notNullable();
      t.integer("icindekiler_id")
        .references("icindekiler_id")
        .inTable("icindekiler");
    });
  return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("icindekiler_adimlar")
    .dropTableIfExists("icindekiler")
    .dropTableIfExists("adimlar")
    .dropTableIfExists("tarifler");
};
