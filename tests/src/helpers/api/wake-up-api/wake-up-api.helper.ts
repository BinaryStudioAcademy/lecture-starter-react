import axios from 'axios';
import { ENV, HttpCode } from '../../../common/enums/enums';

const wakeUpApi = async (): Promise<void> => {
  await axios(ENV.API_PATH, {
    validateStatus: (status) => status < HttpCode.INTERNAL_SERVER_ERROR,
  });
};

export { wakeUpApi };
