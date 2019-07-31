
/**
 * Локатор
 */
class ServiceLocator {
    constructor()
    {
        this._storage = {}
    }

    get(name) {
        if (!this._storage[name]) throw new Error('Service not found: ' + name);
        return this._storage[name];
    }

    add(name, service) {
        this._storage[name] = service;
        return this;
    }

    has(name) {
        return !!this._storage[name];
    }

    delete(name) {
        delete this._storage[name];
        return this;
    }
}

exports = module.exports = new ServiceLocator();