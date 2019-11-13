import HelpOrder from '../models/HelpOrder';

class OrderController {
  async index(req, res) {
    const ordersNull = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(ordersNull);
  }
}

export default new OrderController();
