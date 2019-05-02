exports.up = function(knex) {
  return knex.schema
    .createTable('organizations', table => {
      table.increments()
      table.string('name').unique()
      table
        .datetime('created_at')
        .notNullable()
        .defaultTo(knex.fn.now())
      table
        .datetime('updated_at')
        .notNullable()
        .defaultTo(knex.fn.now())
    })

    .createTable('users', table => {
      table.increments()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table
        .integer('org_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .string('email')
        .notNullable()
        .unique()
      table.string('password').notNullable()
      table.string('role')
      table
        .datetime('created_at')
        .notNullable()
        .defaultTo(knex.fn.now())
      table
        .datetime('updated_at')
        .notNullable()
        .defaultTo(knex.fn.now())
    })

    .createTable('projects', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('name').notNullable()
      table.string('description', 100000).notNullable()
      table.binary('attachment')
      table.string('status').notNullable()
      table
        .datetime('created_at')
        .notNullable()
        .defaultTo(knex.fn.now())
      table
        .datetime('updated_at')
        .notNullable()
        .defaultTo(knex.fn.now())
    })

    .createTable('comments', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('comment').notNullable()
      table
        .datetime('created_at')
        .notNullable()
        .defaultTo(knex.fn.now())
      table
        .datetime('updated_at')
        .notNullable()
        .defaultTo(knex.fn.now())
    })

    .createTable('links', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('link_type').notNullable()
      table.string('link_href').notNullable()
      table
        .datetime('created_at')
        .notNullable()
        .defaultTo(knex.fn.now())
      table
        .datetime('updated_at')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('organizations')
    .dropTableIfExists('users')
    .dropTableIfExists('projects')
    .dropTableIfExists('comments')
    .dropTableIfExists('links')
}
