const knex = require('../database/connection');

class Email {
  async find(email) {
    try {
      const result = await knex.select('*').table('users').where({ email });

      if (result.length > 0) {
        return result[0];
      } else {
        return { status: false, error: `Email não encontrado!` };
      }
    } catch (error) {
      return { status: false, error };
    }
  }
}

module.exports = new Email();
