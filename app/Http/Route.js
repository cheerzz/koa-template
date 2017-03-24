/**
 * Created by placeless on 17/3/21.
 */

import route  from 'koa-route';
import app from './Kernel/app'

let get = (url) => {
    return (target, name, descriptor) => {
        let action = (new (target.constructor))[name];
        app.use(route.get(url, action))
        return descriptor;
    }
}
let post = (url) => {
    return (target, name, descriptor) => {
        let action = (new (target.constructor))[name];
        app.use(route.post(url, action))
        return descriptor;
    }
}

class Route {

    constructor() {
        this.config = {};
    }

    init(config) {
        this.config.prefix = config.prefix || '';
        var that = this;
        return (target) => {
            console.log(that.config.prefix)
        };
    }

    get(url) {
        let that = this;
        return (target, name, descriptor) => {

            let action = (new (target.constructor))[name];
            app.use(route.get(that.config.prefix + url, action));

            return descriptor;
        }
    }

    post(url) {
        let that = this;

        return (target, name, descriptor) => {
            let action = (new (target.constructor))[name];
            app.use(route.post(that.config.prefix + url, action));

            return descriptor;
        }
    }
}
export default new Route

