import {
  GET_POSTS_FROM_MODULE,
  // GET_POSTS,
  POST_ERROR,
  UPDATE_VOTES,
  DELETE_POST,
  ADD_POST,
  UPDATE_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_POSTS_BY_USER,
  GET_POSTS_RECOMMENDATIONS,
  GET_SAVED_POSTS,
  UNSAVE_POST,
  GET_MOST_RECENT_POSTS,
  GET_MOST_LIKED_POSTS,
  GET_MOST_DISCUSSED_POSTS,
} from '../actions/types';

const initialState = {
  posts: [],
  postsByUser: [],
  recommendedPosts: [],
  savedPosts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS_RECOMMENDATIONS:
      return {
        ...state,
        recommendedPosts: payload,
        loading: false,
      };
    case GET_POSTS_FROM_MODULE:
    case GET_MOST_RECENT_POSTS:
    case GET_MOST_LIKED_POSTS:
    case GET_MOST_DISCUSSED_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POSTS_BY_USER:
      return {
        ...state,
        postsByUser: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
        postsByUser: state.postsByUser.filter((post) => post._id !== payload),
        recommendedPosts: state.recommendedPosts.filter(
          (post) => post._id !== payload
        ),
        savedPosts: state.savedPosts.filter((post) => post._id !== payload),
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, text: payload.post.text, title: payload.post.title }
            : post
        ),
        postsByUser: state.postsByUser.map((post) =>
          post._id === payload.id
            ? { ...post, text: payload.post.text, title: payload.post.title }
            : post
        ),
        recommendedPosts: state.recommendedPosts.map((post) =>
          post._id === payload.id
            ? { ...post, text: payload.post.text, title: payload.post.title }
            : post
        ),
        savedPosts: state.savedPosts.map((post) =>
          post._id === payload.id
            ? { ...post, text: payload.post.text, title: payload.post.title }
            : post
        ),
        post:
          state.post && state.post._id === payload.id
            ? {
                ...state.post,
                text: payload.post.text,
                title: payload.post.title,
              }
            : null,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_VOTES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, upvote: payload.upvote, downvote: payload.downvote }
            : post
        ),
        postsByUser: state.postsByUser.map((post) =>
          post._id === payload.id
            ? { ...post, upvote: payload.upvote, downvote: payload.downvote }
            : post
        ),
        recommendedPosts: state.recommendedPosts.map((post) =>
          post._id === payload.id
            ? { ...post, upvote: payload.upvote, downvote: payload.downvote }
            : post
        ),
        savedPosts: state.savedPosts.map((post) =>
          post._id === payload.id
            ? { ...post, upvote: payload.upvote, downvote: payload.downvote }
            : post
        ),
        post:
          state.post && state.post._id === payload.id
            ? {
                ...state.post,
                upvote: payload.upvote,
                downvote: payload.downvote,
              }
            : null,
        loading: false,
      };
    case GET_SAVED_POSTS:
      return {
        ...state,
        savedPosts: payload,
        loading: false,
      };
    case UNSAVE_POST:
      return {
        ...state,
        savedPosts: state.savedPosts.filter((post) => post._id !== payload.id),
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
