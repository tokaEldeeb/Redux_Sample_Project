import React from 'react'
import {useDispatch} from 'react-redux'

import {reactionAdded} from '../Features/Posts/postsSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
  }

  const ReactionButtons = ({post}) => {
    const dispatch = useDispatch();
    const btns = Object.entries(reactionEmoji).map(([name,emoji]) => (
      <button key={name} type="button" className="muted-button reaction-button" onClick={() => dispatch(reactionAdded({postId:post.id,reaction:name}))} >
        {emoji} {post.reactions[name]}
      </button>
    ))
    return <div>{btns}</div>
  }

  export default ReactionButtons;