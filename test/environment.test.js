import test from 'ava';
import Environment from '../src/environment';

const loader = (sourcePath, config)=>{};
const config = {foo: 'bar'};

test('adds a loader', t => {
    const instance = new Environment();

    instance.addLoader('A', loader, config);

    t.is(instance.loaders.get('A'), loader);
    t.is(instance.configs.get('A'), config);
    t.is(instance.currentLoaderId, null);
});

test('adds a loader and sets it as the current loader', t => {
    const instance = new Environment();

    instance.addLoader('A', loader, config, true);

    t.is(instance.loaders.get('A'), loader);
    t.is(instance.configs.get('A'), config);
    t.is(instance.currentLoaderId, 'A');
});

test('sets a loader as the current loader', t => {
    const instance = new Environment();
    instance.loaders.set('A', loader);

    instance.setCurrentLoader('A')

    t.is(instance.currentLoaderId, 'A');
});

test('throws an error when invalid id is used to set the current loader', t => {
    const instance = new Environment();
    t.throws(()=>{instance.setCurrentLoader('A')});
});

test('sets the configuration of a loader', t => {
    const instance = new Environment();
    instance.loaders.set('A', loader);

    instance.setLoaderConfig('A', config)

    t.is(instance.configs.get('A'), config);
});

test('throws an error when invalid id is used to set a loader config', t => {
    const instance = new Environment();
    t.throws(()=>{instance.setLoaderConfig('A', config)});
});