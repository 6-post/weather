/**
 * @exports Dispatcher
 */

import { Dispatcher as FacebookDispatcher } from 'flux';

class Dispatcher extends FacebookDispatcher {
  /**
   * @inheritdoc
   */
  constructor() {
    super();

    /**
     * Actions listeners
     *
     * @type {Object.<string, function[]>}
     */
    this.actionsListeners = {};

    // register handlers
    this.register(this.handle.bind(this));
  }

  /**
   * Register store callback for action
   *
   * @param {string} actionName Action name
   * @param {function} callback Callback
   * @returns void
   */
  on(actionName, callback) {
    if (!this.actionsListeners.hasOwnProperty(actionName)) {
      this.actionsListeners[actionName] = [];
    }

    this.actionsListeners[actionName].push(callback);
  }

  /**
   * Handle action
   *
   * @param {Object} action Action
   * @returns void
   */
  handle(action) {
    if (this.actionsListeners.hasOwnProperty(action.eventName)) {
      this.actionsListeners[action.eventName].forEach(
        handler => handler(action)
      );
    }
  }
}

const dispatcher = new Dispatcher();

export default dispatcher;
