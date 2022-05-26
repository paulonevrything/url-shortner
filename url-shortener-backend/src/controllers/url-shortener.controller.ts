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
} from '@loopback/rest';
import { Url } from '../models';
import { UrlRepository } from '../repositories';
import { nanoid } from 'nanoid'
import * as yup from 'yup';

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

  @get('/urls/count')
  @response(200, {
    description: 'Url model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Url) where?: Where<Url>,
  ): Promise<Count> {
    return this.urlRepository.count(where);
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

  @patch('/urls')
  @response(200, {
    description: 'Url PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, { partial: true }),
        },
      },
    })
    url: Url,
    @param.where(Url) where?: Where<Url>,
  ): Promise<Count> {
    return this.urlRepository.updateAll(url, where);
  }

  @get('/urls/{id}')
  @response(200, {
    description: 'Url model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Url, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Url, { exclude: 'where' }) filter?: FilterExcludingWhere<Url>
  ): Promise<Url> {
    return this.urlRepository.findById(id, filter);
  }

  @patch('/urls/{id}')
  @response(204, {
    description: 'Url PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, { partial: true }),
        },
      },
    })
    url: Url,
  ): Promise<void> {
    await this.urlRepository.updateById(id, url);
  }

  @put('/urls/{id}')
  @response(204, {
    description: 'Url PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() url: Url,
  ): Promise<void> {
    await this.urlRepository.replaceById(id, url);
  }

  @del('/urls/{id}')
  @response(204, {
    description: 'Url DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.urlRepository.deleteById(id);
  }
}
