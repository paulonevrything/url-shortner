import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Url, UrlRelations} from '../models';

export class UrlRepository extends DefaultCrudRepository<
  Url,
  typeof Url.prototype.id,
  UrlRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Url, dataSource);
  }
}
