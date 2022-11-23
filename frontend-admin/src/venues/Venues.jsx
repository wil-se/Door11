import { useEffect, useState } from 'react';
import { history, fetchWrapper } from '_helpers';
import PostPreview from '_components/PostPreview';
import Preview from '_components/Preview';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Pages from '_components/Pages'


export { Venues };

function Venues() {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const fetchPosts = async () => {
        const baseUrl = `${process.env.REACT_APP_API_URL}`;
        let posts = await fetchWrapper.get(`${baseUrl}/backend/venue/?page=${currentPage}`);
        setPosts(posts)
        console.log(posts)
    }

    useEffect(() => {
        // dispatch(postActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchPosts();
    // eslint-disable-next-line
    }, [currentPage]);

    return (
        <div>
            <h2>Venues</h2>
            <Row>
            {
                posts.results && posts.results.map(post => <Col xs={12} md={6} key={post.id}><Preview key={post.id} content={post} category={'venues'}/></Col>)
            }
            </Row>
            <div className='d-flex justify-content-center'>
                <Pages total={posts.total_pages} current={posts.current_page_number} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    );
}
