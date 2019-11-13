import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { id } = req.params;

    const helpOrder = await HelpOrder.findAll({
      where: { student_id: id },
    });

    return res.json(helpOrder);
  }

  async post(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const addHelp = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json(addHelp);
  }

  async update(req, res) {
    const { id } = req.params;
    const { answer } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Id invalid' });
    }

    const helpOrders = await HelpOrder.findOne({
      where: { student_id: id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['nome', 'email'],
        },
      ],
    });

    if (!helpOrders) {
      return res.status(400).json({ error: 'Help order not found' });
    }

    const helpAnswer = new Date();

    await helpOrders.update({
      answer,
      answer_at: helpAnswer,
    });

    /*
    await Queue.add(RegistrationMail.key, {
      registrationComplete,
    }); */

    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
