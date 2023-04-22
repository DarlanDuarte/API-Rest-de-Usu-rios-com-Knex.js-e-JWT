const bcrypt = require('bcrypt');

const knex = require('../database/connection');

class User {
  async findAll() {
    try {
      const result = await knex
        .select(['id', 'name', 'email', 'role'])
        .table('users');

      return result;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async findById(id) {
    try {
      const result = await knex
        .select(['id', 'name', 'email', 'role'])
        .table('users')
        .where({ id });

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async new(name, email, password) {
    try {
      const hash = await bcrypt.hash(password, 10);

      await knex
        .insert({ name, email, password: hash, role: 0 })
        .table('users');
    } catch (error) {
      console.log(error);
    }
  }

  async findEmail(email) {
    try {
      const result = await knex.select('*').from('users').where({ email });

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = new User();
