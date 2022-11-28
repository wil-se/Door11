import { useEffect, useState } from 'react';
import { fetchWrapper } from '_helpers';
import Preview from '_components/Preview';
import { Row, Col } from 'react-bootstrap';
import Pages from '_components/Pages'


export { Eventsets };

function Eventsets() {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const fetchPosts = async () => {
        const baseUrl = `${process.env.REACT_APP_API_URL}`;
        let posts = await fetchWrapper.get(`${baseUrl}/backend/eventset/?page=${currentPage}`);
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
            <h2>Event sets</h2>
            <Row>
            {
                posts.results && posts.results.map(post => <Col xs={12} md={6} key={post.id}><Preview key={post.id} content={post} category={'eventsets'}/></Col>)
            }
            </Row>
            <div className='d-flex justify-content-center'>
                <Pages total={posts.total_pages} current={posts.current_page_number} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    );
}
