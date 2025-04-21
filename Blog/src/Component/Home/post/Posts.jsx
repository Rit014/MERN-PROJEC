import { useEffect, useState } from "react";
import API from '../../../service/api.js';
import { Box, Grid, CircularProgress } from '@mui/material';
import Post from './Post.jsx';
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Posts = () => {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPost(response.data);
            }
            setLoading(false);
        };
        fetchData();
    }, [category]);

    return (
        <>
            <Box sx={{ padding: '0 20px' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <CircularProgress size="5rem" sx={{ color: '#B9D9EB' }} />
                    </Box>
                ) : posts && posts.length > 0 ? (
                    <Grid container spacing={2}>
                        {posts.map(post => (
                            <Grid item lg={3} sm={6} xs={12} key={post._id}>
                                <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Post post={post} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            color: '#555555',
                            margin: '40px auto',
                            fontSize: 20,
                            textAlign: 'center',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 500,
                            lineHeight: 1.6,
                            maxWidth: '600px',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>
                            Oops! No Data Available 😥
                        </div>
                        <div>
                            Simply select a category and create your own blog.<br />
                            <span style={{ fontStyle: 'italic', color: '#007bff' }}>Happy Blogging ☺</span>
                        </div>
                    </Box>

                )}
            </Box>
        </>
    );
};

export default Posts;
