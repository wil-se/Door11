import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history, fetchWrapper } from '_helpers';
import PostPreview from '_components/PostPreview';
import { postActions } from '_store';
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap';
import Pages from '_components/Pages'

export { Articles };

function Articles() {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const fetchPosts = async () => {
        const baseUrl = `${process.env.REACT_APP_API_URL}`;
        let posts = await fetchWrapper.get(`${baseUrl}/backend/post/?page=${currentPage}&type=article`);
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
            <h2>Articles</h2>
            <Row>
            {
                posts.results && posts.results.map(post => <Col key={post.id} xs={12} md={6}><PostPreview key={post.id} post={post}/></Col>)
            }
            </Row>
            <div className='d-flex justify-content-center'>
                <Pages total={posts.total_pages} current={posts.current_page_number} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    );
}
