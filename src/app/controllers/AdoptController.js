import Pet from '../models/Pet';
import User from '../models/User';
import File from '../models/File';

class AdoptController {
  async index(req, res) {
    const adopt = await Pet.findAll({
      where: { adoption_status: false },
      attributes: [
        'id',
        'name',
        'city',
        'date_birth',
        'size',
        'raca',
        'responsible_id',
      ],
      include: [
        {
          model: File,
          attributes: ['id', 'name', 'path'],
        },
        {
          model: [User],
          attributes: ['id', 'name', 'user_name'],
        },
      ],
    });

    return res.json(adopt);
  }
}

export default new AdoptController();
