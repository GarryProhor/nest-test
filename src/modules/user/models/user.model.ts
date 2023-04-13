import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Watchlist } from '../../watchlist/model/watchlist.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  userName: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchList: Watchlist[];
}
