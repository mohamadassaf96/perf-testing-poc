import http from 'k6/http';

export class Httpx {
  private baseURL: string;

  constructor(opts: { baseUrl: string }) {
    this.baseURL = opts.baseUrl;
  }

  private request(method: 'POST' | 'GET', path: string, operationId: string, token?: string, body?: any) {
    const url = `${this.baseURL}${path}`;
    const headers = {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    }
    let resp = http.request(method, url, JSON.stringify(body), {
      headers,
      tags: { operationId },
    });
    return resp;
  }


  public post(path: string, body: any, operationId: string, token?: string) {
    return this.request('POST', path, operationId, token, body)
  }


  public get(path: string, operationId: string, token?: string) {
    return this.request('GET', path, operationId, token)
  }
}