import React from 'react';
import AbstractComponent from '../components/AbstractComponent.jsx';
import Wrapper from '../components/Wrapper.jsx';
import Loading from '../components/Loading.jsx';
import ResultСountry from '../components/ResultСountry.jsx';
import CountryStore from '../stores/CountryStore';
import APIweatherActionCreator from '../creators/APIweatherActionCreator';

class Home extends AbstractComponent {
  /**
   * @inheritdoc
   */
  constructor(props){
    super(props);

    console.log(props);

    this.state = {
      /**
      * country
      */
      country : {},
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
        store: CountryStore,
        eventName: 'change',
        callback: this.storeChangeHandler.bind(this),
      },
    ];
  }


  /**
   * @inheritdoc
   */
  getStoresConfig() {
    return [
      {
        store: CountryStore,
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
      country: CountryStore.get('country'),
      loading: CountryStore.get('loading'),
    });
  }

  _onHandlerChange(event) {
    if (event.target.value != '') {
      APIweatherActionCreator.fetchWeather(event.target.value);
     // console.log(this.state.data);
    }
  }

  /**
   * @inheritdoc
   */
  componentDidMount() {
    super.componentDidMount();

    APIweatherActionCreator.fetchWeather();
  }

  /**
   * @inheritdoc
   */
  render() {
    return (
        <Wrapper>
          <input onChange={this._onHandlerChange.bind(this)} className="input" placeholder="Введите название города"/>
          <ResultСountry data={this.state.country}/>
          <Loading loading={this.state.loading}>

          </Loading>
        </Wrapper>
    );
  }
}

export default Home;
