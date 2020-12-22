import React,{Fragment} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import PostsList from './Features/Posts/PostsList'
import AddPostForm from './Features/Posts/AddPostForm'
import SinglePost from './Features/Posts/SinglePost'
import EditPostForm from './Features/Posts/EditPostForm'
import NotificationsList from './Features/Notification/NotificationList'
import UsersList from './Features/Users/UserList'
import UserPage from './Features/Users/UserPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Fragment>
                <AddPostForm/>
                <PostsList/>
              </Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePost}/>
          <Route exact path="/posts/editPost/:postId" component={EditPostForm}/>
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList}/>

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
