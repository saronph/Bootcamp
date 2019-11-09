import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

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

  // processa a fila
  processQueue() {
    jobs.forEach(job => {
      // pega bee e handle da fila relacionado com o job
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }
}

export default new Queue();
