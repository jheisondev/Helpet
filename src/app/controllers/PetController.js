import * as Yup from 'yup';
import Pet from '../models/Pet';
import User from '../models/User';

class PetController {
  // Create Pet ############################
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Informe o nome!')
        .min(3, 'O nome deve conter no mínimo 3 letras!'),
      city: Yup.string().required('Informe cidade!'),
      state: Yup.string()
        .required('Informe Estado!')
        .min(2)
        .max(2),
      date_birth: Yup.date().required('Informe data de nascimento do Pet!'),
      size: Yup.string().required('Informe porte do pet!'),
      responsible_id: Yup.number().required(),
      raca: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    // Criando Pet
    const {
      id,
      name,
      raca,
      city,
      state,
      date_birth,
      size,
      adoption_status,
      responsible_id,
    } = await Pet.create(req.body);
    return res.json({
      id,
      name,
      raca,
      city,
      state,
      date_birth,
      size,
      adoption_status,
      responsible_id,
    });
  }

  // Create Usuario ############################
  // ---------------------------------------------------------------------------
  // Update de Usuario ###########################
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3, 'O nome deve conter no mínimo 3 letras!'),
      city: Yup.string(),
      state: Yup.string()
        .min(2)
        .max(2),
      date_birth: Yup.string(),
      size: Yup.string(),
      adoption_status: Yup.boolean(),
      responsible_id: Yup.number().required(),
      raca: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    const petExists = await User.findOne({
      where: { id: req.body.responsible_id },
    });

    if (!petExists) {
      return res.status(400).json({ error: 'Pet não encontrado!' });
    }
    // Criando Pet
    const {
      id,
      name,
      raca,
      city,
      state,
      date_birth,
      size,
      adoption_status,
      responsible_id,
    } = await Pet.update(req.body);
    return res.json({
      id,
      name,
      raca,
      city,
      state,
      date_birth,
      size,
      adoption_status,
      responsible_id,
    });
  }
  // Update de Usuario ###########################
}

export default new PetController();
