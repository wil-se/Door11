import { useEffect, useState } from 'react';
import { history, fetchWrapper } from '_helpers';
import PostPreview from '_components/PostPreview';
import Preview from '_components/Preview';

export { Venues };

function Venues() {
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const baseUrl = `${process.env.REACT_APP_API_URL}`;
        let posts = await fetchWrapper.get(`${baseUrl}/backend/venue/`);
        setPosts(posts)
        console.log(posts)
    }

    useEffect(() => {
        // dispatch(postActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchPosts();
    // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h2>Venues</h2>
            {
                posts.map(post => <Preview key={post.id} content={post} category={'venues'}/>)
            }
        </div>
    );
}
