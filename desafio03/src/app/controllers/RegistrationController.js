import { parseISO, isBefore, addMonths, startOfDay } from 'date-fns';
import * as Yup from 'yup';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

import Mail from '../../lib/Mail';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const validStudent = await Student.findByPk(student_id);

    if (!validStudent)
      return res.status(401).json({ error: "This student doesn't exist!" });

    const checkRegistration = await Registration.findOne({
      where: { student_id },
    });

    if (checkRegistration) {
      return res.json('Student already has a plan');
    }

    const dateStart = startOfDay(parseISO(start_date));

    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const plan = await Plan.findByPk(plan_id);

    const endOfPlan = addMonths(parseISO(start_date), plan.duration);
    const finalPrice = plan.price * plan.duration;

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: dateStart,
      end_date: endOfPlan,
      price: finalPrice,
    });

    const registrationComplete = await Registration.findByPk(registration.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['nome', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    await Mail.sendMail({
      to: `${registrationComplete.student.nome} <${registrationComplete.student.email}>`,
      subject: 'Matrícula realizada com sucesso!',
      text: 'Seja bem vindo a Gympoint!',
    });

    await Queue.add(RegistrationMail.key, {
      registrationComplete,
    });

    return res.json(registration);
  }

  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
      ],
    });

    return res.json(registrations);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    const { plan_id, student_id, start_date } = req.body;

    const checkPlan = await Plan.findByPk(plan_id);

    if (!checkPlan) {
      return res.json('Plan does not exists');
    }

    const checkStudent = await Student.findByPk(student_id);

    if (!checkStudent) {
      return res.json('Student does not exists');
    }

    const plan = await Plan.findByPk(plan_id);
    const dateStart = startOfDay(parseISO(start_date));

    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const endOfPlan = addMonths(parseISO(start_date), plan.duration);
    const finalPrice = plan.price * plan.duration;

    const setRegistration = await registration.update({
      id,
      student_id,
      plan_id,
      price: finalPrice,
      start_date: dateStart,
      end_date: endOfPlan,
    });

    return res.json(setRegistration);
  }

  async delete(req, res) {
    const registrations = await Registration.findByPk(req.params.id);
    const { id } = req.params;

    if (!registrations) {
      return res.status(400).json({ error: 'Registration does not exists' });
    }

    await registrations.destroy({
      where: {
        id,
      },
    });

    return res.json(registrations);
  }
}

export default new RegistrationController();
