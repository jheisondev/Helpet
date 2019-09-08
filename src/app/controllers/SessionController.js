import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      user_name: Yup.string()
        .required('Informe nome de usuário!')
        .min(4, 'O nome deve conter mais de 4 letras!'),
      password: Yup.string().required('Informe a senha!'),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    const { user_name, password } = req.body;

    const user = await User.findOne({ where: { user_name } });
    if (!user) {
      return res.status(400).json({ error: 'Usuário não cadastrado!' });
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
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expired,
      }),
    });
  }
}

export default new SessionController();
