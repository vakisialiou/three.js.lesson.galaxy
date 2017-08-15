
class Conf {

    constructor(env) {

        /**
         * Server.ENV_DEV|Server.ENV_PROD
         *
         * @type {string}
         * @private
         */
        this._environment = env;

        /**
         * @type {{encoding: string, server: {dev: {port: number, host: string}, prod: {port: number, host: string}}, socket: {dev: {port: number, host: string}, prod: {port: number, host: string}}}}
         */
        this._conf = require('../config/config.json');

        /**
         * @type {{database: {host: string, port: number, user: string, password: string, database: string}}}
         */
        this.database = require('../config/database.json');

        /**
         * @type {{mailer: {sender: string, transporter: {host: string, port: number, secure: bool, auth: {user: string, pass: string}}}}}
         */
        this.mailer = require('../config/mailer.json');

        /**
         * @type {{security: {access_control: [{path: ''}, {path: "/home", role: "ROLE_IW_USER"}],role_hierarchy: {ROLE_ANONYMOUSLY: [], ROLE_IW: [ROLE_ANONYMOUSLY], ROLE_IW_USER: [ROLE_IW], ROLE_IW_ADMIN: [ROLE_IW_USER]}}}}
         */
        this.security = require('../config/security.json');
    }

    /**
     *
     *
     * @returns {string}
     * @constructor
     */
    static get ENV_DEV() {
        return 'dev';
    }

    /**
     *
     *
     * @returns {string}
     * @constructor
     */
    static get ENV_PROD() {
        return 'prod';
    }

    /**
     * Check Environment is dev
     *
     * @returns {boolean}
     */
    isDevEnv() {
        return this._environment === Conf.ENV_DEV;
    }

    /**
     * Check Environment is prod
     *
     * @returns {boolean}
     */
    isProdEnv() {
        return this._environment === Conf.ENV_PROD;
    }

    /**
     *
     * @returns {{port: number, host: string}}
     */
    get server() {
        return this.isDevEnv() ? this._conf.server.dev : this._conf.server.prod;
    }

    /**
     *
     * @returns {{port: number, host: string}}
     */
    get socket() {
        return this.isDevEnv() ? this._conf.socket.dev : this._conf.socket.prod;
    }

    /**
     *
     * @returns {Array}
     */
    get accessControl() {
        return (this.security && this.security.hasOwnProperty('access_control')) ? this.security['access_control'] : [];
    }

    /**
     *
     * @returns {Object}
     */
    get roleHierarchy() {
        return (this.security && this.security.hasOwnProperty('role_hierarchy')) ? this.security['role_hierarchy'] : {};
    }
}

/**
 *
 * @module Conf
 */
export default Conf;
