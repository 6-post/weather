/**
 * @exports AbstractStore
 */

import _ from 'lodash';
import dispatcher from '../dispatcher';

/**
 * @abstract
 */
export default class AbstractStore {
  /**
   * @constructor
   */
  constructor() {
    /**
     * Store events listeners
     *
     * @type {Object.<string, function[]>}
     */
    this.eventsListeners = {};

    this.initActionListeners();

    this.reset();
  }

  /**
   * Resets store state
   */
  reset() {
    /**
     * @type {Object} Internal data container
     */
    this.data = {};
  }

  /**
   * Update data storage
   *
   * @param {string} name Key name
   * @param {*} [value] New value
   * @returns {AbstractStore} chainable AbstractStore instance
   */
  set(name, value) {
    _.set(this.data, name, value)

    return this;
  }

  /**
   * Get value or array of values from data storage
   *
   * @param {string} name Key name
   * @returns {*} A value or object
   */
  get(name) {
    return _.get(this.data, name, null);
  }

  /**
   * Get dispatcher actions listeners
   *
   * @returns {Object.<string, function(Object)>} Action handler with event argument
   */
  getActionListeners() {
    return {};
  }

  /**
   * Init dispatcher actions listeners
   *
   * @returns {AbstractStore}
   */
  initActionListeners() {
    _.map(
      this.getActionListeners(),
      (listener, actionName) => {
        dispatcher
          .on(
            actionName,
            ({ data }) => listener.call(this, data)
          );
      }
    );

    return this;
  }

  /**
   * Bind callback to event
   *
   * @param {string} eventName Event name
   * @param {function} callback Callback
   * @returns {Object.<
   *    AbstractStore store,
   *    string eventName,
   *    Symbol key,
   *    callback callback,
   *    callback unbind,
   * >} Handle object to unbind later
   */
  bind(eventName, callback) {
    if (!this.eventsListeners.hasOwnProperty(eventName)) {
      this.eventsListeners[eventName] = new Map();
    }

    const key = Symbol('callback id');

    this.eventsListeners[eventName].set(key, callback);

    return {
      store: this,
      eventName,
      key,
      callback,
      unbind: () => {
        this.unbind(eventName, key);
      },
    };
  }

  /**
   * Unbind callback from event
   * Or unbind all callbacks from event
   *
   * @param {string} eventName Event name
   * @param {Symbol} key Callback key
   * @returns {AbstractStore}
   */
  unbind(eventName, key) {
    if (this.eventsListeners.hasOwnProperty(eventName) && (typeof key === 'symbol')) {
      this.eventsListeners[eventName].delete(key);
    }

    return this;
  }

  /**
   * Trigger event
   *
   * @param {string} eventName Event name
   * @returns {AbstractStore}
   */
  trigger(eventName) {
    if (this.eventsListeners.hasOwnProperty(eventName)) {
      this.eventsListeners[eventName].forEach(
        callback => callback.call(this)
      );
    }

    return this;
  }
}
