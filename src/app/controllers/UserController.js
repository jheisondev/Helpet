import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  // Create Usuario ############################
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Informe o nome!')
        .min(3, 'O nome deve conter mais de 3 letras!'),
      user_name: Yup.string()
        .required('Informe nome de usuário!')
        .min(4, 'O nome deve conter mais de 4 letras!'),
      email: Yup.string()
        .required('Informe email!')
        .email('Informe email válido!'),
      password: Yup.string()
        .required('Informe a senha!')
        .min(6, 'Informe senha com no mínimo 6 caracteres')
        .max(8, 'Informe senha com no máximo 8 caracteres'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }
    // Controle de usuario já cadastrado
    const emailUserExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailUserExists) {
      return res
        .status(400)
        .json({ error: 'Este e-mail já esta sendo usado por uma conta!' });
    }
    const userExists = await User.findOne({
      where: { user_name: req.body.user_name },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Nome de usuario já esta sendo usado!' });
    }

    // Criando usuario
    const { id, user_name, email, account_status } = await User.create(
      req.body
    );
    return res.json({
      id,
      user_name,
      email,
      account_status,
    });
  }

  // Create Usuario ############################
  // ---------------------------------------------------------------------------
  // Update de Usuario ###########################
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3, 'O nome deve conter mais de 3 letras!'),
      user_name: Yup.string().min(4, 'O nome deve conter mais de 4 letras!'),
      email: Yup.string().email('Informe email válido!'),
      oldPassword: Yup.string().min(6, 'Informe no mínimo 6 caracteres'),
      password: Yup.string()
        .min(6, 'Informe senha com no mínimo 6 caracteres')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    const { user_name, email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);
    if (email !== user.email) {
      const emailUserExists = await User.findOne({
        where: { email },
      });
      if (emailUserExists) {
        return res
          .status(400)
          .json({ error: 'Este e-mail já esta sendo usado por uma conta!' });
      }
    }

    if (user_name !== user.user_name) {
      const userExists = await User.findOne({
        where: { user_name },
      });
      if (userExists) {
        return res.status(400).json({ error: 'Nome de usuário indisponível!' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ erro: 'Senha inválida!' });
    }

    const { id, name, account_status } = await user.update(req.body);
    return res.json({
      id,
      name,
      user_name,
      email,
      account_status,
    });
  }
  // Update de Usuario ###########################
}

export default new UserController();
