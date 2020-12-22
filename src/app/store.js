import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../Features/Posts/postsSlice'
import usersReducer from '../Features/Users/UsersSlice'
import notificationReducer from '../Features/Notification/NotificationSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users:usersReducer,
    notifications:notificationReducer
  }
})