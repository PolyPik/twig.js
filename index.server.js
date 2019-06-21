import {readFile} from 'fs';
import path from 'path';
import util from 'util';
import ky from 'ky-universal';
import Environment from './src/environment';
import {fsLoader, httpLoader} from './src/loaders';

const environment = new Environment();

environment.addLoader(
    'fs',
    fsLoader(util.promisify(readFile), path),
    {root: process.cwd()},
    true
);

environment.addLoader(
    'http',
    httpLoader(ky.create()),
    {root: 'http://localhost/'}
);

export default environment;
