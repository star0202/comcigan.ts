import { request } from 'undici'

export default class HTTP {
  private readonly baseURL: string
  private readonly headers: Record<string, string>

  constructor({
    baseURL,
    headers,
  }: { baseURL: string; headers: Record<string, string> }) {
    this.baseURL = baseURL
    this.headers = headers
  }

  async get(url: string) {
    return request(`${new URL(url, this.baseURL)}`, {
      headers: this.headers,
    })
  }
}
