import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import HelpOrderController from './app/controllers/HelpOrderController';
import OrderController from './app/controllers/OrderController';
import authMiddleware from './app/middlewares/auth';

import CheckinController from './app/controllers/CheckinController';

const routes = new Router();

routes.post('/students/:id/checkins', CheckinController.store);

routes.use(authMiddleware);

routes.post('/sessions', SessionController.store);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

routes.get('/students/:id/checkins', CheckinController.index);

routes.get('/students/:id/helporders', HelpOrderController.index);
routes.post('/students/:id/helporders', HelpOrderController.post);
routes.put('/students/:id/helporders', HelpOrderController.update);

routes.get('/students/:id/orders', OrderController.index);

export default routes;
