import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.body;
    const { id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) return res.status(401).json({ error: 'Id invalid.' });

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (checkins.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Limit exceeded, please wait for next week' });
    }

    const { checkin_id } = await Checkin.create(req.body);

    return res.json({
      checkin_id,
    });
  }

  async index(req, res) {
    const { id } = req.params;

    const student_id = await Checkin.findAll({
      where: { student_id: id },
    });

    return res.json(student_id);
  }
}

export default new CheckinController();
