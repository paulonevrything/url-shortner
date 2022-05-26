import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
  Response,
  RestBindings,
} from '@loopback/rest';
import { Url } from '../models';
import { UrlRepository } from '../repositories';
import { nanoid } from 'nanoid'
import * as yup from 'yup';
import { inject } from '@loopback/core';

let schema = yup.object().shape({
  longUrl: yup.string().trim().url().required(),
  shortUrl: yup.string().trim()
});

export class UrlShortenerController {
  constructor(
    @repository(UrlRepository)
    public urlRepository: UrlRepository,
  ) { }

  @post('/urls')
  @response(200, {
    description: 'Url model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Url) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {
            title: 'NewUrl',
            exclude: ['id'],
          }),
        },
      },
    })
    url: Omit<Url, 'id'>,
  ): Promise<Url> {

    // Validate request
    let validReq = await schema.isValid(url);
    if (!validReq) {
      throw new HttpErrors.BadRequest('Invalid url passed');
    }

    // Check if a short url has been created for this url
    let existingShortUrl = await this.urlRepository.find({ where: { longUrl: url.longUrl }, limit: 1 });
    if (existingShortUrl.length > 0) {
      return existingShortUrl[0];
    }

    // Create short url
    url.shortUrl = nanoid(5).toLowerCase();

    return this.urlRepository.create(url);
  }

  @get('/urls')
  @response(200, {
    description: 'Array of Url model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Url, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Url) filter?: Filter<Url>,
  ): Promise<Url[]> {
    return this.urlRepository.find(filter);
  }

  @get('/urls/{shortUrl}')
  @response(200, {
    description: 'Url model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Url, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('shortUrl') shortUrl: string,
    @inject(RestBindings.Http.RESPONSE) response: Response
  ) {

    let result = await this.urlRepository.findOne({ where: { shortUrl: shortUrl }, limit: 1 });

    if (result != null) {
      return response.redirect(result.longUrl);
    }
    else {
      throw new HttpErrors.NotFound('Short URL not found');
    }

  }

}
