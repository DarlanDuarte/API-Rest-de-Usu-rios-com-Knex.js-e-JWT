const User = require('../models/User');

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (email === undefined) {
      res.status(400).json({ err: 'O email é invalido' });
      return;
    }

    if (name === undefined) {
      res.status(400).json({ err: 'O name é invalido' });
      return;
    }

    if (password === undefined) {
      res.status(400).json({ err: 'O password é invalido' });
      return;
    }

    const emailExit = await User.findEmail(email);

    if (emailExit) {
      res.status(406).json({ err: `O email cadastrado já existe` });
      return;
    }

    await User.new(name, email, password);

    res.status(200).send(`Requisiçao aceita com success!`);
  }

  async index(req, res) {
    const users = await User.findAll();

    res.json(users);
  }

  async findUser(req, res) {
    const id = req.params.id;

    const user = await User.findById(id);

    if (user === undefined) {
      res.status(404).json({ err: 'Usuario não encontrado' });
    } else {
      res.status(200).json(user);
    }
  }

  async edit(req, res) {
    const { id, name, email, role } = req.body;

    const result = await User.update(id, name, email, role);

    if (result !== undefined) {
      if (result.status) {
        res.status(200).send(`Usuário atualizado com Success!`);
      } else {
        res.status(406).send(result.error);
      }
    } else {
      res.status(406).send(`Ocorreu um error!`);
    }
  }

  async remove(req, res) {
    const id = req.params.id;

    const result = await User.delete(id);

    if (result.status) {
      res.status(200).send(`Usuário deletado com Sucesso!`);
    } else {
      res.status(406).send(result.error);
    }
  }
}

module.exports = new UserController();
