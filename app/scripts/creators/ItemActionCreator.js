/**
 * Item actions
 *
 * @exports ItemActionCreator singleton
 */

import AbstractActionCreator from '../creators/AbstractActionCreator';

class ItemActionCreator extends AbstractActionCreator {
  /**
   * Load items
   */
  loadItems() {
    this.dispatch('items:loadStart');

    // make your api call/ async stuff here
    // we use setTimeout for faking async behaviour here
    setTimeout(() => {
      const items = ['Foo', 'Bar', 'Baz'];
      this.dispatch('items:loadSuccess', items);
      // on error
      // this.dispatch('items:loadError', error);
    }, 500);
  }
}

const instance = new ItemActionCreator();

export default instance;
