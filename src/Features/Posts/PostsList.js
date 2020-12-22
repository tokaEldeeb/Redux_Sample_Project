import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'

import {selectAllPosts,fetchPosts,selectPostIds} from './postsSlice'
import PostExcerpt from './PostExcerpt'

export const PostsList = () => {
const dispatch = useDispatch();

const orderedPostIds = useSelector(selectPostIds)
const status = useSelector(state => state.posts.status);
const err = useSelector(state => state.posts.error);

useEffect(() => {
    if(status === 'idle'){
        dispatch(fetchPosts());
    }
},[status,dispatch]);

let body;

if(status === 'loading'){
  body = <div className="loader">Loading...</div>
}
else if(status ==='succeeded'){
    /*const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
            <PostExcerpt post={post} withLinks={true} key={post.id}/>
    ));*/

    const renderedPosts = orderedPostIds.map(postId => (
      <PostExcerpt key={postId} postId={postId} />
    ))
    body = renderedPosts;
}
else{
body = (<h1>Error : {err}</h1>)
}
return (
    <section className="posts-list">
    <h2>Posts</h2>
    {body}
  </section>
)
}

export default PostsList;