import { createSlice,nanoid ,createAsyncThunk, createSelector, createEntityAdapter} from '@reduxjs/toolkit'
import { client } from '../../api/client'


/*const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' ,userid :'0',date:'2020-12-13T10:30:21.570Z',reactions:{thumbsUp:0,hooray:0,heart:0,rocket:0,eyes:0}},
  { id: '2', title: 'Second Post', content: 'More text' ,userid :'2',date:'2020-12-13T10:30:21.570Z',reactions:{thumbsUp:0,hooray:0,heart:0,rocket:0,eyes:0}}
]*/
export const postAdapter = createEntityAdapter({  //getInitialState() returns an empty {ids: [], entities: {}} 
  sortComparer : (a,b) => b.date.localeCompare(a.date)
});

const initialState = postAdapter.getInitialState({status:'idle',error:null});

  export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
  })
  
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded:{
    reducer(state,action) {
          //state.posts.push(action.payload);
          postAdapter.addOne(state,action.payload);
      },
      prepare(title,content,userid){
          return {payload : {
              id:nanoid(),
              title,
              content,
              userid,
              date: new Date().toISOString(),
              reactions:{thumbsUp:0,hooray:0,heart:0,rocket:0,eyes:0}
          }
        }
      }

    },
      postEdited(state,action){
        const { id, title, content } = action.payload
        const existingPost = state.entities[id]
        if (existingPost) {
          existingPost.title = title
          existingPost.content = content
        }
    },
    reactionAdded(state,action){
      const { postId, reaction } = action.payload
      //const existingPost = state.posts.find(post => post.id === postId)
      const existingPost = state.entities[postId];

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      //state.posts = state.posts.concat(action.payload)
      postAdapter.upsertMany(state, action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})
export const {postAdded,postEdited,reactionAdded} = postsSlice.actions;

export default postsSlice.reducer;

export const { //The generated selector functions are always called selectAll and selectById, so we can use ES6 destructuring syntax to rename them
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postAdapter.getSelectors(state => state.posts)

//export const selectAllPosts = state => state.posts.posts;

//export const selectPostById = (state,postId) =>  state.posts.posts.find(post => post.id === postId);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)

