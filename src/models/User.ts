import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '@/config/database';
import { IUserProps, IUserCreationProps, UserRole, UserStatus } from '@/types';

const USER_STATUS_VALUES = ['active', 'inactive', 'banned', 'pending'] as const;
const USER_ROLE_VALUES = ['admin', 'user', 'moderator'] as const;

type UserStatusValue = (typeof USER_STATUS_VALUES)[number];
type UserRoleValue = (typeof USER_ROLE_VALUES)[number];

export class User
  extends Model<IUserProps, IUserCreationProps>
  implements IUserProps
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare was_confirmed: boolean;
  declare email_unconfirmed: string;
  declare confirmation_token?: string;
  declare status: UserStatus;
  declare role: UserRole;
  declare salt: string;
  declare password: string;
  declare confirmed_at?: Date;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;
  declare readonly deleted_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    was_confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email_unconfirmed: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
    confirmation_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...(USER_STATUS_VALUES as unknown as string[])),
      allowNull: false,
      defaultValue: 'pending' as UserStatusValue,
    },
    role: {
      type: DataTypes.ENUM(...(USER_ROLE_VALUES as unknown as string[])),
      allowNull: false,
      defaultValue: 'user' as UserRoleValue,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

User.addHook('beforeCreate', async (user: User) => {
  const salt = await bcrypt.genSalt();
  user.salt = salt;
  user.password = await bcrypt.hash(user.password, salt);
});

User.addHook('beforeUpdate', async (user: User) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt();
    user.salt = salt;
    user.password = await bcrypt.hash(user.password, salt);
  }
});

export default User;
