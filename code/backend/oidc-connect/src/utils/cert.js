import {readFileSync} from 'node:fs';
import path from 'node:path';

export const privateKey = readFileSync(path.resolve('./cert/private-key.pem'));
export const publicKey = readFileSync(path.resolve('./cert/public-key.pub'));