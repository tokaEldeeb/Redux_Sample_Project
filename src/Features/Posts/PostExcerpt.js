import React from 'react'
import { Link } from 'react-router-dom'

import TimeAgo from '../../Common/TimeAgo'
import ReactionButtons from '../../Common/ReactionButtons'

import PostAuthor from '../Users/PostAuthor'
import { selectPostById } from './postsSlice'
import { useSelector } from 'react-redux'

const PostExcerpt = ({postId,withLinks=false}) => {
    const post = useSelector(state => selectPostById(state, postId))

return (    
    <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor userId={post.user}/>
        <TimeAgo timestamp={post.date}/>
        <p className="post-content">{withLinks ? post.content.substring(0,100) : post.content}</p>
        <ReactionButtons post={post}/>
        {withLinks && 
            <div>
                <Link to={`/posts/${post.id}`} className="button muted-button">Details</Link>
                <Link to={`/posts/editPost/${post.id}`} className="button muted-button">Edit</Link>
            </div>
        }

    </article>
)
}

//export default React.memo(PostExcerpt);
export default PostExcerpt;
