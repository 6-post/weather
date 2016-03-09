/**
 * @exports AbstractComponent
 */

import React from 'react';

/**
 * Base react component
 *
 * @abstract
 */
class AbstractComponent extends React.Component {
  /**
   * @inheritdoc
   */
  constructor(props) {
    super(props);

    /**
     * Component css styles
     *
     * @type {Object}
     */
    this.styles = {};

    /**
     * Array of handles for stores we have bound to
     *
     * @type {Array.<Object>}
     */
    this.boundStoreHandles = [];

    /**
     * Event listeners, will be automatically removed on component unmount
     *
     * @type {Array.<{target: object, type: string, callback: callback}>} Bound event listeners
     */
    this.eventListeners = [];
  }

  /**
   * Provide callback for each store and event component should handle
   *
   * @returns {Array.<{store: AbstractStore, eventName: string, [callback]: callback}>} Array of dependency configuration objects
   */
  getStoresConfig() {
    return [];
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    this.registerStoreBindings();
  }

  /**
   * @inheritdoc
   */
  componentWillUnmount() {
    this.removeRegisteredStoreHandles();
    this.removeRegisteredEventListeners();
  }

  /**
   * Register store bindings from getStoresConfig()
   */
  registerStoreBindings() {
    this.getStoresConfig().forEach(
      params => {
        const handle = params.store.bind(
          params.eventName,
          params.callback.bind(this)
        );

        this.boundStoreHandles.push(handle);
      }
    );
  }

  /**
   * Remove previously registered store bindings
   */
  removeRegisteredStoreHandles() {
    this.boundStoreHandles
      .forEach(handle => handle.unbind());
  }

  /**
   * Add event listener and store its parameters to automatically remove it later
   *
   * @param {Object} target DOM element to add listener to
   * @param {string} type DOM event type
   * @param {function()} callback Event handler
   */
  registerEventListener(target, type, callback) {
    const listener = this.eventListeners
      .find(
        listener =>
          listener.target === target
            && listener.type === type
      );

    if (!listener) {
      target.addEventListener(type, callback);
      this.eventListeners.push({target, type, callback});
    }
  }

  /**
   * Remove registered event listeners
   */
  removeRegisteredEventListeners() {
    let eventListener;
    while (eventListener = this.eventListeners.pop()) {
      eventListener.target.removeEventListener(
        eventListener.type,
        eventListener.callback
      );
    }
  }
}

export default AbstractComponent;
