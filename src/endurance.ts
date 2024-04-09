import { setupVu } from './core/setup';
import {
  accessHomePageExec,
  accessHomePageMs,
} from './scenarios'

setupVu();

export const options = {
  scenarios: {
    userLoggingIn: accessHomePageMs('endurance'),
  },
};

export {
  accessHomePageExec,
}

