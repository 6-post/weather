/**
 * ItemStore example
 *
 * @exports ItemStore singleton
 */

import AbstractStore from '../stores/AbstractStore';

/**
 * @inheritdoc
 */
export default class ItemStore extends AbstractStore {
  /**
   * @inheritdoc
   */
  getActionListeners() {
    return {
      /**
       * Load start
       */
      'items:loadStart': () => {
        this
          .set('loading', true)
          .set('error', null)
          .set('items', [])
          .trigger('change');
      },
      /**
       * Load success
       *
       * @param {array} items Items
       */
      'items:loadSuccess': items => {
        this
          .set('loading', false)
          .set('error', null)
          .set('items', items)
          .trigger('change');
      },
      /**
       * Load error
       *
       * @param {Error} error Error
       */
      'items:loadError': error => {
        this
          .reset()
          .set('error', error)
          .trigger('change');
      },
    };
  }
}

const instance = new ItemStore();

export default instance;
