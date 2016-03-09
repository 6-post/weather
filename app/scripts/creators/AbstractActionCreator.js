/**
 * @exports AbstractActionCreator
 */

import ReactDOM from 'react-dom';
import dispatcher from '../dispatcher';

/**
 * @abstract
 */
export default class AbstractActionCreator {
  /**
   * Dispatch action
   *
   * @access protected
   * @param {string} actionName Action name
   * @param {Object} [data = {}] Action data
   * @returns {AbstractActionCreator}
   */
  dispatch(actionName, data = {}) {
    dispatcher.dispatch({
      eventName: actionName,
      data,
    });

    return this;
  }
}
