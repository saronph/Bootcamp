import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  // executa tarefa, em cada email
  async handle({ data }) {
    const { registrationComplete } = data;

    await Mail.sendMail({
      to: `${registrationComplete.student.nome} <${registrationComplete.student.email}>`,
      subject: 'Matrícula realizada com sucesso!',
      template: 'registration',
      context: {
        student: registrationComplete.student.nome,
        date: format(
          parseISO(registrationComplete.start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new RegistrationMail();
