import Bee from 'bee-queue';
import RegistrationMail from '../app/jobs/RegistrationMail';
import redisConfig from '../config/redis';

const jobs = [RegistrationMail];

class Queue {
  constructor() {
    // armazena todos os jobs
    this.queues = {};

    this.init();
  }

  init() {
    // foreach pq nao precisa retornar nada,
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // add novos trabalhos dentro de cada fila
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      // pega bee e handle da fila relacionado com o job
      const { bee, handle } = this.queues[job.key];

      // add verificação de erro com 'on'
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
