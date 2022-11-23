import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history, fetchWrapper } from '_helpers';
import PostPreview from '_components/PostPreview';
import { postActions } from '_store';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Pages from '_components/Pages'

export { Events }

function Events() {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const fetchPosts = async () => {
        const baseUrl = `${process.env.REACT_APP_API_URL}`;
        let posts = await fetchWrapper.get(`${baseUrl}/backend/post/?page=${currentPage}&type=event`);
        setPosts(posts)
    }

    useEffect(() => {
        // dispatch(postActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchPosts();
    // eslint-disable-next-line
    }, [currentPage]);

    return (
        <div>
            <h2>Events</h2>
            <Row>
            {
                posts.results && posts.results.map(post => {return <Col key={post.id} xs={12} md={6}><PostPreview key={post.id} post={post}/></Col>})
            }
            </Row>
            <div className='d-flex justify-content-center'>
                <Pages total={posts.total_pages} current={posts.current_page_number} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    );
}
