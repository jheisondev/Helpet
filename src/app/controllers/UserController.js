import User from '../models/User';

class UserController {
  async store(req, res) {
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
    // ------------------------
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
}

export default new UserController();
