const jwt = require('jsonwebtoken');

const secret = 'afdawf2awf51wf1a63w5ef1aw3f135ewfa313w5e1f';

module.exports = function (req, res, next) {
  const authToken = req.headers['authorization'];

  if (authToken !== undefined) {
    const bearer = authToken.split(' ');
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, secret);

      console.log(decoded);
      next();
    } catch (error) {
      res.status(403).send(`Voçe não está autenticado`);
    }
  } else {
    res.status(403).send(`Voçe não está autenticado`);
  }
};
