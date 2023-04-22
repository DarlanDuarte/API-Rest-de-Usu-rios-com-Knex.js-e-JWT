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
}

module.exports = new UserController();
