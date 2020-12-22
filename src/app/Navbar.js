import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchNotifications } from '../Features/Notification/NotificationSlice'

export const Navbar = () => {
const dispatch = useDispatch();
const fetchNewNotifications = () => {
  dispatch(fetchNotifications())
}

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to='/'>Posts</Link>
            <Link to='/users'>Users</Link>
            <Link to='/notifications'>Notifications</Link>
          </div>
        </div>
        <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
      </section>
    </nav>
  )
}
