export const fsLoader = (readFile, path) => (sourcePath, {root}) => {
    return readFile(path.join(root, sourcePath), 'utf8');
};

export const httpLoader = ky => (sourcePath, {root}) => {
    return ky.get(sourcePath, {prefixUrl: root}).then(
        response => response.text()
    );
};
