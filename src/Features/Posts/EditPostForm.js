import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'


import {postEdited,selectPostById} from './postsSlice'


export const EditPostForm = ({match}) => {
  const {postId} = match.params;

  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector(state => selectPostById(state,postId));

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onSaveClicked = () => {
    if(title && content){
        const newProduct = {
            id:post.id,
            title,
            content
        };
        dispatch(postEdited(newProduct));
        history.push(`/posts/${postId}`);
    }
  }

  return (
    <section>
      <h2> Edit Post</h2>
      <form>
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

export default EditPostForm;