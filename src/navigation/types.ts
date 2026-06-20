import { User } from '../types';

export type RootStackParamList = {
  UserList: undefined;
  UserDetail: { user: User };
};
