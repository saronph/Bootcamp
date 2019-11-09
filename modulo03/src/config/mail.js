// dados para envio de email, usado foi Mailtrap(para dev), online precisa outro(amazon ses)
export default {
  host: 'smtp.mailtrap.io',
  port: '2525',
  secure: false,
  auth: {
    user: 'dca36e8db3bda1',
    pass: '183ab3baa8be7f',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};
