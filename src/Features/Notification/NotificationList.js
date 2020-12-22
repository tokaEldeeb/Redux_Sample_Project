import { formatDistanceToNow, parseISO } from 'date-fns';
import React from 'react';
import {useSelector} from 'react-redux'
import {selectAllNotifications} from './NotificationSlice'

export const NotificationList = () => {
 const notifications = useSelector(selectAllNotifications);
 const users = useSelector(state => state.users);

 const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unknown User'
    }
    return (
        <div key={notification.id} className="notification">
          <div>
            <b>{user.name}</b> {notification.message}
          </div>
          <div title={notification.date}>
            <i>{timeAgo} ago</i>
          </div>
        </div>
      )
    });

 return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );

}

export default NotificationList;