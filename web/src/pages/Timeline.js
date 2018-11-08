import React, { Component } from 'react';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg';
import './Timeline.css';

require('dotenv').config();

class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ''
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket(process.env.REACT_APP_BASE_URL);

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });
    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(
          tweet => (tweet._id === data._id ? data : tweet)
        )
      });
    });
  }

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('@GoTwitter:username');

    await api.post('tweets', { content, author });

    this.setState({ newTweet: '' });
  };

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value });
  };

  render() {
    return (
      <div className='timeline-wrapper'>
        <img src={twitterLogo} height={24} alt='Twitter logo' />
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder='O que está acontecendo?'
          />
        </form>
        <ul className='tweet-list'>
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Timeline;
