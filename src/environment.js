/* eslint-disable no-unused-vars */
export default class Environment {
    constructor() {
        this.loaders = new Map();
        this.configs = new Map();
        this.currentLoaderId = null;
    }

    /**
    * Asynchronously load a template.
    * @param {string} path The path or id of the template
    * @param {Object} [config={}] A loader configuration object
    *
    * @return {Promise<Template>} A Promise that resolves to a Twig Template object
    */
    load(path, config = {}) {
    }

    /**
    * Create a template using pre-processed data.
    * @param {Object} data The pre-processed template data
    * @param {string} [templateId=null] The id of the template
    * @return {Template} A Twig Template object
    */
    create(data, templateId = null) {
    }

    /**
    * Set the current loader to be used by the environment
    * @param {string} loaderId The id of a registered loader
    */
    setLoader(loaderId) {
        if (!this.loaders.has(loaderId)) {
            throw new Error(`Unable to set current loader. No loader associated with id '${loaderId}'.`);
        }

        this.currentLoaderId = loaderId;
    }

    /**
    * Set the default configuration of a registered loader
    * @param {string} loaderId The id of a registered loader
    * @param {Object} config The loader configuration object
    */
    setLoaderConfig(loaderId, config) {
        if (!this.loaders.has(loaderId)) {
            throw new Error(`Unable to set loader configuration. No loader associated with id '${loaderId}'.`);
        }

        this.configs.set(loaderId, config);
    }

    /**
    * @param {string} loaderId The string used to identify the loader
    * @param {function} definition The loader definition
    * @param {Object} config The loader configuration object
    * @param {boolean} [setCurrent=false] Set this loader to be the current loader
    */
    addLoader(loaderId, definition, config, setCurrent = false) {
        this.loaders.set(loaderId, definition);
        this.configs.set(loaderId, config);

        if (setCurrent) {
            this.currentLoaderId = loaderId;
        }
    }

    /**
    * @param {string} name The name of the filter
    * @param {function} definition The filter definition
    */
    addFilter(name, definition) {
    }

    /**
    * @param {string} name The name of the function
    * @param {function} definition The function definition
    */
    addFunction(name, definition) {
    }

    /**
    * @param {string} name The name of the test
    * @param {function} definition The test definition
    */
    addTest(name, definition) {
    }

    /// #if target == 'node'
    /**
    * @param {string} name The name of the compiler
    * @param {function} definition The compiler definition
    */
    addCompiler(name, definition) {
    }
    /// #endif
}

