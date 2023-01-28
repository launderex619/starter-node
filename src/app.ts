import dotenv from 'dotenv';
import * as path from 'path';
import Server from './server';

dotenv.config({ path: path.resolve(process.cwd(), 'config.env') });

const server = new Server();
server.run();
