import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history, fetchWrapper } from '_helpers';

import { postActions } from '_store';

export { Home };

function Home() {
    const dispatch = useDispatch();

    const query = async () => {
        const baseUrl = `${process.env.REACT_APP_API_URL}`;
        let query = await fetchWrapper.get(`${baseUrl}/backend/post/`);
        console.log(query)
    }

    useEffect(() => {
        // dispatch(postActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        query();
    // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h1>Logged in</h1>
            <h2>Posts</h2>
            {/* {posts.loading && <div className="spinner-border spinner-border-sm"></div>}
            {posts.error && <div className="text-danger">Error loading users: {posts.error.message}</div>} */}
        </div>
    );
}
