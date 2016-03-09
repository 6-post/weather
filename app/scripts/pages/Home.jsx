import React from 'react';
import AbstractComponent from '../components/AbstractComponent.jsx';
import ItemList from '../components/ItemList.jsx';
import ItemStore from '../stores/ItemStore';
import ItemActionCreator from '../creators/ItemActionCreator';

class Home extends AbstractComponent {
  /**
   * @inheritdoc
   */
  constructor(props){
    super(props);

    this.state = {
      /**
      * Items
      */
      items : [],
      /**
      * Loading state
      */
      loading: false
    };
  }

  /**
   * @inheritdoc
   */
  getStoresConfig() {
    return [
      {
        store: ItemStore,
        eventName: 'change',
        callback: this.storeChangeHandler.bind(this),
      },
    ];
  }

  /**
   * Items store change handler
   */
  storeChangeHandler() {
    this.setState({
      items: ItemStore.get('items'),
      loading: ItemStore.get('loading'),
    });
  }

  /**
   * @inheritdoc
   */
  componentDidMount() {
    super.componentDidMount();
    
    ItemActionCreator.loadItems();
  }

  /**
   * @inheritdoc
   */
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <ItemList { ...this.state } />
      </div>
    );
  }
}

export default Home;
