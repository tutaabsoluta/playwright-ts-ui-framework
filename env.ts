import dotenv from 'dotenv';
import { dot } from 'node:test/reporters';

dotenv.config();

export const env = {
    USER_MAIL: process.env.USER_MAIL!,
    USER_PASSWORD: process.env.USER_PASSWORD!,
};