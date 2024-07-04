import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {
    id: 1,
    image: "https://picsum.photos/id/123/500/500",
    description: "Post 1 description",
    data: new Date().toISOString(),//convert Date object into a string.Output will be something like "2024-07-02T12:34:56.789Z"
    likes: 15,
    comments:5  
  },
  {
    id: 2,
    image: "https://picsum.photos/id/124/500/500",
    description: "Post 2 description",
    date: new Date().toISOString(),
    likes: 30,
    comments:10
  },
  {
    id: 3,
    image: "https://picsum.photos/id/125/500/500",
    description: "Post 1 description",
    data: new Date().toISOString(),//convert Date object into a string.Output will be something like "2024-07-02T12:34:56.789Z"
    likes: 15,
    comments:5  
  },
  {
    id: 4,
    image: "https://picsum.photos/id/126/500/500",
    description: "Post 2 description",
    date: new Date().toISOString(),
    likes: 30,
    comments:10
  },
  {
    id: 5,
    image: "https://picsum.photos/id/127/500/500",
    description: "Post 1 description",
    data: new Date().toISOString(),//convert Date object into a string.Output will be something like "2024-07-02T12:34:56.789Z"
    likes: 15,
    comments:5  
  },
  {
    id: 6,
    image: "https://picsum.photos/id/128/500/500",
    description: "Post 2 description",
    date: new Date().toISOString(),
    likes: 30,
    comments:10
  }
]

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    createPost: (state, action) => {
      const newPost = {
        id: Date.now(),
        image: action.payload.image,
        description:action.payload.description,
        date: new Date().toISOString(),
        likes: 0,
        comments:0,
      }
      state.push(newPost)
    },

    updatePost: (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload.id)
      state[index]=action.payload
    },

    deletePost: (state, action) => {
      //return new array not include current post
       return state.filter((post) => post.id !== action.payload.id)
    
    }
  }
})

export const { createPost,updatePost,deletePost } = postsSlice.actions
export default postsSlice.reducer