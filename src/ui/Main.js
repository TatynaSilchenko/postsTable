import React, {useEffect, useState} from "react";
import Table from "./table/Table";
import {connect} from "react-redux";
import {getPostsData, setCurrentPage} from "../redux/TableReducer";
import Spinner from "./Spinner/Spinner";
import Pagination from "./Pagenation/Pagination";
import UserInformation from "./modalWindow/userInformation";


const Main = ({currentPage, postsPerPage, posts, ...props}) => {
    //Get posts
    useEffect(() => {
        props.getPostsData();
        // eslint-disable-next-line
    },[]);

    //Get current posts
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [body, setBody] = useState('');

    //Change page
    const paginate = (number) => {
        props.setCurrentPage(number)
    };
    if (props.isLoading) return <Spinner/>;

    return <>
        {showModal && <UserInformation lgShow={showModal} setLgShow={setShowModal}
                                       title={title} username={username} body={body}/>}
        <Table posts={currentPosts} isLoading={props.isLoading} {...props} setTitle={setTitle}
               setUsername={setUsername} setBody={setBody} setShowModal={setShowModal}/>
        <Pagination postsPerPage={postsPerPage} totalCountPosts={posts.length}
                    paginate={paginate}/>

    </>
}
let mapStateToProps = (state) => {
    return {
        posts: state.table.posts,
        isLoading: state.table.isLoading,
        currentPage: state.table.currentPage,
        postsPerPage: state.table.postsPerPage
    }
};

export default connect(mapStateToProps, {getPostsData, setCurrentPage})(Main);
