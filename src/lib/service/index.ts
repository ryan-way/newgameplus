import { CountService } from './count-service';
import { ComputeService } from './compute-service';
import { LogService } from './log-service';

const countService = new CountService();
const computeService = new ComputeService();
const logService = new LogService();

export { countService, computeService, logService };
