import React from 'react'
import {useSelector} from 'react-redux'

import {selectPostById} from './postsSlice'
import PostExcerpt from './PostExcerpt'

export const SinglePost = ({match}) => {
    const {postId} = match.params;
    const post = useSelector(state => selectPostById(state,postId));

    if(!post){
          return (
            <section>
                <h2>Post not found!</h2>
             </section>
          )  
    }
    else{
        return (
            <PostExcerpt post={post}/>
        )
    }

}

export default SinglePost;