import crypto from 'crypto';
import { IHashPasswordResponseProps } from 'types';

export const generateRandomString = (length: number): string => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

export const hashString = (str: string): string => {
  return crypto.createHash('sha256').update(str).digest('hex');
}

export const hashPassword = (password: string): IHashPasswordResponseProps  => {
  const salt = generateRandomString(16);

  return {
    hashedPassword: hashString(password + salt),
    salt,
  };
}