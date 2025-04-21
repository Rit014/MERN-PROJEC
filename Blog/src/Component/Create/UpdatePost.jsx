import React, { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import { AddPhotoAlternate as AddPhoto, Update } from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider.jsx';
import API from '../../service/api.js';

const Container = styled(Box)(({ theme }) => ({
    margin: '0 100px',
    padding: '20px 0',
    [theme.breakpoints.down('md')]: {
        margin: '7px 10px',
    },
}));

const Image = styled('img')({
    width: '100%',
    height: 'auto',
    maxHeight: '60vh',
    objectFit: 'cover',
    borderRadius: '8px',
});

const StyledFormControl = styled(FormControl)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    font-size: 18px;
    padding: 10px;
    margin-left: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;

    &:focus-visible {
        outline: none;
        border-color: #1976d2;
    }
`;

const TextArea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    marginTop: '30px',
    fontSize: '16px',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fff',
    color: theme.palette.mode === 'dark' ? '#f5f5f5' : '#000',

    '&:focus-visible': {
        outline: 'none',
        borderColor: '#1976d2',
    },
}));



const ButtonStyled = styled(Button)`
    margin-top: 20px;
    background-color: #1976d2;
    color: white;

    &:hover {
        background-color: #1565c0;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
};

const UpdatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const url = post.picture || 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    useEffect(() => {
        const fetchPostData = async () => {
            const response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchPostData();
    }, [id]);

    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await API.uploadFile(formData);
                const imageUrl = response.data.newPost.picture;

                setPost((prevPost) => ({
                    ...prevPost,
                    picture: imageUrl,
                }));
            }
        };

        if (file) {
            uploadImage();
        }

        setPost((prevPost) => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username,
        }));
    }, [file, account.username, location.search]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleUpdatePost = async () => {
        const response = await API.updatePost(post);
        if (response.isSuccess) {
            navigate(`/details/${id}`);
        }
    };

    return (
        <Container>
            <Image src={url} alt="Post Banner" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <AddPhoto fontSize="large" color="primary" style={{ cursor: 'pointer' }} />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField
                    placeholder="Title"
                    value={post.title}
                    onChange={handleInputChange}
                    name="title"
                />
            </StyledFormControl>

            <TextArea
                minRows={5}
                placeholder="Describe your post..."
                value={post.description}
                onChange={handleInputChange}
                name="description"
            />

            <ButtonStyled variant="contained" onClick={handleUpdatePost}>
                Update Post
            </ButtonStyled>
        </Container>
    );
};

export default UpdatePost;
