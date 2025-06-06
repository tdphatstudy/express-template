import { generateRandomString, hashPassword, hashString } from '@/helpers';
import { get } from 'http';
import { User } from '@/models/User';

export const createUser = async (data: { name: string; email: string }) => {
  const { name, email } = data;
  const  password = hashPassword(generateRandomString(16))
  return await User.create({
    name,
    email,
    role: 'user',
    status: 'pending',
    salt: password.salt,
    was_confirmed: false,
    email_unconfirmed: email,
    password: password.hashedPassword,
    confirmation_token: generateRandomString(32)
  });
};

export const getAllUsers = async () => {
  return await User.findAll();
};
