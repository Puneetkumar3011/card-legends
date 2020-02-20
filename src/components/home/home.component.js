import React, { Component } from 'react';
import axios from 'axios';
import * as _ from 'lodash';

import { CardList } from '../card-list/card-list.component';
import { SearchBox } from '../search-box/search-box.component';
import { LEGENDS_SVC_URL } from '../../common/app.constants';
import './home.styles.scss';

class HomeComponent extends Component {
  constructor() {
    super();

    this.state = {
      legends: [],
      pageSize: 20,
      pageNo: 1,
      loading: true,
      searchField: ''
    };
  }

  componentWillMount() {
    this.loadLegends();
    window.addEventListener(
      'scroll',
      _.debounce(e => {
        this.handleScroll(e);
      }, 500)
    );
  }

  loadLegends = () => {
    const { pageSize, pageNo } = this.state;
    this.setState({ loading: true });
    axios
      .get(`${LEGENDS_SVC_URL}?pageSize=${pageSize}&page=${pageNo}`)
      .then(res => {
        if (res && res.data && res.data.cards) {
          this.setState((prev, props) => {
            return {
              legends: [...prev.legends, ...res.data.cards],
              pageNo: prev.pageNo + 1,
              loading: false
            };
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleScroll = () => {
    var lastPagePos = document.querySelector('#lastPagePosition');
    var lastOffset = lastPagePos.offsetTop + lastPagePos.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset >= lastOffset) {
      this.loadLegends();
    }
  };

  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  getSpinner = () => {
    const { loading } = this.state;
    if (loading) return <div className="spinner-border text-primary"></div>;
    else return <div>&nbsp;</div>;
  };

  getCardList = () => {
    const { legends, searchField } = this.state;
    const filteredLegends = legends.filter(legend =>
      legend.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div>
        <CardList legends={filteredLegends} />
        {this.getSpinner()}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="header">Legends</div>
        <SearchBox onSearchChange={this.onSearchChange} />
        <div className="homepage">{this.getCardList()}</div>
        <div id="lastPagePosition">&nbsp;</div>
      </div>
    );
  }
}

export default HomeComponent;
