import { login, signOut } from "../actions/login";

import exec from 'k6/execution';
import { sleep } from "k6";

const waitTimeAfterLogin = 1;
const waitTimeAfterVu = 1;

export function accessHomePageExec() {
  const index = (exec.vu.idInTest - 1);
  const user = globalThis.users[index];
  const response = login(user.username, user.password);
  signOut(response.accessToken);
  sleep(waitTimeAfterLogin);
  sleep(waitTimeAfterVu);
}

export function accessHomePageMs(type: 'load' | 'stress' | 'endurance' | 'smoke') {
  return accessHomePage(type, accessHomePageExec.name);
}

export function accessHomePage(type: 'load' | 'stress' | 'endurance' | 'smoke', exec: string) {
  switch (type) {
    case 'load':
      return {
        executor: 'ramping-vus',
        startVUs: 0,
        gracefulRampDown: '600s',
        stages: [
          { duration: '1m', target: 20 },
          { duration: '3m', target: 20 },
          { duration: '1m', target: 0 }
        ],
        exec,
      }
    case 'endurance':
      return {
        executor: 'ramping-vus',
        startVUs: 0,
        gracefulRampDown: '300s',
        stages: [
          { duration: '1h', target: 1610 },
          { duration: '12h', target: 1610 },
          { duration: '1h', target: 0 },
        ],
        exec,
      }
    case 'smoke':
      return {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
        exec,
      }
  }

}
