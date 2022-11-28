import { useEffect, useState } from 'react';
import { fetchWrapper } from '_helpers';
import Preview from '_components/Preview';
import { Row, Col } from 'react-bootstrap';
import Pages from '_components/Pages'


export { Brands };

function Brands() {
    const [brands, setBrands] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const fetchBrands = async () => {
        const baseUrl = `${process.env.REACT_APP_API_URL}`;
        let brands = await fetchWrapper.get(`${baseUrl}/backend/brand/?page=${currentPage}`);
        setBrands(brands)
    }

    useEffect(() => {
        // dispatch(postActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchBrands();
    // eslint-disable-next-line
    }, [currentPage]);

    return (
        <div>
            <h2>Brands</h2>
            <Row>
            {
                brands.results && brands.results.map(post => <Col key={post.id} xs={12} md={6}><Preview key={post.id} content={post} category={'brands'}/></Col>)
            }
            </Row>
            <div className='d-flex justify-content-center'>
                <Pages total={brands.total_pages} current={brands.current_page_number} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    );
}
