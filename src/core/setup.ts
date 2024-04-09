import { SharedArray } from "k6/data";
import { Httpx } from "./httpx";

const idpBaseUrl = __ENV.IDP_BASE_URL || `http://212.71.255.60:8000`;
const apiBaseUrl = __ENV.API_BASE_URL || `http://212.71.255.60:8000`;

globalThis.users = new SharedArray('clients', function () {
  return JSON.parse(open(`../data/users.json`));
});

export function setupVu() {
  globalThis.api = new Httpx({ baseUrl: apiBaseUrl });
  globalThis.idp = new Httpx({ baseUrl: idpBaseUrl });
}