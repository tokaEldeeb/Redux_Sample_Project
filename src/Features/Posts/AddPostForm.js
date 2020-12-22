import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'

import {postAdded} from './postsSlice'

export const AddPostForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [user, setUser] = useState('')

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onUserChange = e => setUser(e.target.value)

  const onSaveClicked = () => {
    if(title && content){
       /* const newProduct = {
            id:nanoid(),
            title,
            content
        };*/
        //dispatch(postAdded(newProduct));
        dispatch(postAdded(title,content,user));
        setTitle("");
        setContent("")
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
          <label htmlFor="userid">Users</label>
          <select id="postAuthor" value={user} onChange={onUserChange}>
            {
                users.map(user => (
                 <option key={user.id} value={user.id}>{user.name}</option>
                ))
            }
          </select>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSaveClicked} disabled={!title || !content}>Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm;