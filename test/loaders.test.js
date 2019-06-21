import path from 'path';
import test from 'ava';
import sinon from 'sinon';
import ky, {HTTPError, TimeoutError} from 'ky-universal';
import {fsLoader, httpLoader} from '../src/loaders';

const config = {root: path.join(process.cwd(), 'test/fixtures')};

test('loads a local template source file', async t => {
    const readFile = sinon.stub().resolves('Test Template Message: {{message}}');

    const source = await fsLoader(readFile, path)('test.twig', config);

    t.is(source, 'Test Template Message: {{message}}');
});

test('throws an error when unable to read a file', async t => {
    const readFile = sinon.stub().rejects(new Error(''));

    const promise = fsLoader(readFile, path)('nonexistent.twig', config);
    await t.throwsAsync(promise);
});

test('loads a remote template source file', async t => {
    const kyInstance = ky.create();
    sinon.stub(kyInstance, 'get').resolves({
        text: () => 'Test Template Message: {{message}}'
    });

    const source = await httpLoader(kyInstance)('test.twig', {root: 'http://localhost/'});
    t.is(source, 'Test Template Message: {{message}}');
});

test('throws an error when the server responds with an error', async t => {
    const kyInstance = ky.create();
    sinon.stub(kyInstance, 'get').rejects(new HTTPError({statusText: ''}));

    const promise = httpLoader(kyInstance)('test.twig', {root: 'http://localhost/'});
    await t.throwsAsync(promise, {instanceOf: HTTPError});
});

test('throws an error when the server does not respond', async t => {
    const kyInstance = ky.create();
    sinon.stub(kyInstance, 'get').rejects(new TimeoutError());

    const promise = httpLoader(kyInstance)('test.twig', {root: 'http://localhost/'});
    await t.throwsAsync(promise, {instanceOf: TimeoutError});
});
