import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const planExists = await Plan.findOne({
      where: { price: req.body.price },
    });

    if (planExists) {
      return res
        .status(400)
        .json({ error: 'Is there a plan with the same value.' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { price } = req.body;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    if (plan !== plan.price) {
      const priceExists = await Plan.findOne({ where: { price } });

      if (priceExists) {
        return res
          .status(400)
          .json({ error: 'Is there a plan with the same value.' });
      }
    }

    const { title, duration } = await plan.update(req.body);

    return res.json({ id, title, duration, price });
  }

  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async delete(req, res) {
    const plans = await Plan.findByPk(req.params.id);
    const { id } = req.params;

    if (!plans) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    await plans.destroy({
      where: {
        id,
      },
    });

    return res.json(plans);
  }
}

export default new PlanController();
