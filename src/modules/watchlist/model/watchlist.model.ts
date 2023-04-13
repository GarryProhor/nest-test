import { Column, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

@Table
export class WatchlistModel extends Model {
  @Column
  user: User;

  @Column
  name: string;

  @Column
  assetId: string;
}
