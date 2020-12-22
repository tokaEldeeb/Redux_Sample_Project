import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

import { fetchUsers } from './Features/Users/UsersSlice'
import {fetchNotifications } from './Features/Notification/NotificationSlice'

import './api/server'

store.dispatch(fetchUsers())
store.dispatch(fetchNotifications())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
