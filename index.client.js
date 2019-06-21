import ky from 'ky-universal';
import Environment from './src/environment';
import {httpLoader} from './src/loaders';

const environment = new Environment();

environment.addLoader(
    'http',
    httpLoader(ky.create()),
    {root: 'http://localhost/'},
    true
);

export default environment;
