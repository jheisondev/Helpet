import * as Yup from 'yup';
import Pet from '../models/Pet';

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
    try {
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
    } catch (error) {
      return res.json(error);
    }
  }

  // Create Usuario ############################
  // ---------------------------------------------------------------------------
  // Update de Usuario ###########################
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().min(3, 'O nome deve conter no mínimo 3 letras!'),
      city: Yup.string(),
      state: Yup.string()
        .min(2)
        .max(2),
      date_birth: Yup.string(),
      size: Yup.string(),
      adoption_status: Yup.boolean(),
      responsible_id: Yup.number().required(),
      avatar_pet_id: Yup.number().required(),
      raca: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados inválidos!' });
    }

    const pet = await Pet.findByPk(req.body.id);

    if (!pet) {
      return res.status(400).json({ error: 'Pet não encontrado!' });
    }

    // atualizando Pet
    try {
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
      } = await pet.update(req.body);
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
    } catch (error) {
      return res.json(error);
    }
  }
  // Update de Usuario ###########################
}

export default new PetController();
