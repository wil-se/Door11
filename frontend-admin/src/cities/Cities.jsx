import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history, fetchWrapper } from '_helpers';
import PostPreview from '_components/PostPreview';
import { postActions } from '_store';
import Preview from '_components/Preview';

export { Cities };

function Cities() {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const baseUrl = `${process.env.REACT_APP_API_URL}`;
        let posts = await fetchWrapper.get(`${baseUrl}/backend/city/`);
        setPosts(posts)
    }

    useEffect(() => {
        // dispatch(postActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchPosts();
    // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h2>Cities</h2>
            {
                posts.map(post => <Preview key={post.id} content={post} category={'cities'}/>)
            }
        </div>
    );
}
