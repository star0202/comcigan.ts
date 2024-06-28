import type Comcigan from '../client'

export default class Fetcher {
  protected readonly client!: Comcigan

  constructor(client: Comcigan) {
    Object.defineProperty(this, 'client', { value: client, enumerable: false })
  }
}
