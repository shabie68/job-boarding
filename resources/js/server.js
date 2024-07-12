// const Pusher = require('pusher');
import Pusher from 'pusher-js';


const pusher = new Pusher({
  appId: '1823666',
  key: '1823666',
  secret: 'b0e38996f06dcc044ea9',
  cluster: 'ap2',
  useTLS: true
});

pusher.trigger('my-channel', 'my-event', {
  message: 'hello world'
});