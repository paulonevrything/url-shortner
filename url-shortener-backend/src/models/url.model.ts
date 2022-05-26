import {Entity, model, property} from '@loopback/repository';

@model()
export class Url extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  longUrl: string;

  @property({
    type: 'string',
  })
  shortUrl?: string;


  constructor(data?: Partial<Url>) {
    super(data);
  }
}

export interface UrlRelations {
  // describe navigational properties here
}

export type UrlWithRelations = Url & UrlRelations;
