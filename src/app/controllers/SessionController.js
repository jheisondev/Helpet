import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { user_name, password } = req.body;

    const user = await User.findOne({ where: { user_name } });
    if (!user) {
      return res.status(400).json({ error: 'Nenhum usuário encontrado!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha inválida!' });
    }

    const { id, email } = user;
    return res.json({
      user: {
        id,
        user_name,
        email,
      },
      token: jwt.sign({ id }, '6e6b389d9fa8a432c10ce901606fe30a', {
        expiresIn: '30d',
      }),
    });
  }
}

export default new SessionController();
