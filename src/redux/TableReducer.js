import {dataApi} from "../api/api";

const SET_POSTS = "TABLE/SET_POSTS";
const SET_ISLOADING = "TABLE/SET_ISLOADING";
const SET_CURRENT_PAGE = "TABLE/SET_CURRENT_PAGE";
const SET_POSTS_TOTAL_COUNT = "TABLE/SET_POSTS_TOTAL_COUNT";

const initialState = {
    columns: {
        id: {
            key: 'id',
            label: 'ID',
        },
        title: {
            key: 'title',
            label: 'Title',
        },
        username: {
            key: 'username',
            label: 'Author',
        },
    },
    posts:[],
    isLoading: false,
    currentPage: 1,
    postsPerPage: 10
};

const TableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {...state, posts: action.posts};
        case SET_ISLOADING:
            return {...state, isLoading: action.value};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.number};
        case SET_POSTS_TOTAL_COUNT:
            return {...state, totalCountPosts: action.number};
        default: {
            return state;
        }
    }
};

export const setPosts = (posts) => ({type: SET_POSTS, posts});
export const setCurrentPage = (number) => ({type: SET_CURRENT_PAGE, number});
export const setIsLoading = (value) => ({type: SET_ISLOADING, value});
export const getPostsData = () => async (dispatch) => {
    try {
        dispatch(setIsLoading(true));
        Promise.all([await dataApi.getUsers(), await dataApi.getPosts()]).then((values) => {
            const users = values[0];
            const posts = values[1];
            const postsInfo=posts.map(p=>{
                return {...p,username:users.filter(u=>u.id===p.userId)[0].username}
            })
            dispatch(setPosts(postsInfo))
        });
        dispatch(setIsLoading(false))
    } catch (e) {
        throw new Error(e)
    }
};

export default TableReducer
