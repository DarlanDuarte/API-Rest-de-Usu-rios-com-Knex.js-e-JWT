const { v4: newUuid } = require('uuid');

const User = require('./User');
const knex = require('../database/connection');

class PasswordToken {
  async create(email) {
    const user = await User.findByEmail(email);

    if (user !== undefined) {
      try {
        const uuid = newUuid();

        await knex
          .insert({
            user_id: user.id,
            token: uuid,
            used: 0,
          })
          .table('passwordtoken');

        return { status: true, token: uuid };
      } catch (error) {
        return { status: false, error };
      }
    } else {
      return { status: false, error: `O email não existe!` };
    }
  }

  async validate(token) {
    try {
      const result = await knex
        .select()
        .table('passwordtoken')
        .where({ token });

      if (result.length > 0) {
        const tk = result[0];

        if (tk.used) {
          return { status: false, error: `O token já foi utilizado!` };
        } else {
          return { status: true, token: tk };
        }
      } else {
        return { status: false };
      }
    } catch (error) {
      return { status: false, error: `Token invalido!` };
    }
  }

  async setUsed(token) {
    await knex.update({ used: 1 }).table('passwordtoken').where({ token });
  }
}

module.exports = new PasswordToken();
