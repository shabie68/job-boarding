/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/Example');
// require('./components/Login');

import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';


import Example from './components/Example'
import Login from './components/Login'
import Register from './components/Register'



const container = document.getElementById('app');
const root = createRoot(container);

root.render(window.location.href.includes('/login') ? <Login /> : window.location.href.includes('register') ? <Register /> :  <Example />);