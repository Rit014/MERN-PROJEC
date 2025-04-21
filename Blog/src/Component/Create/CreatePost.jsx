import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    styled,
    FormControl,
    InputBase,
    Button,
    TextareaAutosize
} from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import API from '../../service/api.js';
import { toast } from 'react-toastify';

// Styled Components
const Container = styled(Box)(({ theme }) => ({
    margin: '7px 10px',
    [theme.breakpoints.down('md')]: {
        margin: '7px 10px',
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
}));

const InputTextField = styled(InputBase)(({ theme }) => ({
    flex: 1,
    fontSize: '25px',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

const TextArea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    marginTop: '50px',
    fontSize: '18px',
    padding: '12px',
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fff',
    color: theme.palette.mode === 'dark' ? '#f5f5f5' : '#000',

    '&:focus-visible': {
        outline: 'none',
        borderColor: '#1976d2',
    },
}));


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
};

const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();

    const url = post.picture
        ? post.picture
        : 'https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?t=st=1745132617~exp=1745136217~hmac=2e2d247ec0cc94746e687642ee43c9ebcb61a9f156f41c62642c8d7c251bafb6&w=1060';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('file', file);

                const response = await API.uploadFile(data);
                const imageUrl = response.data.newPost.picture;

                setPost((prevPost) => ({
                    ...prevPost,
                    picture: imageUrl,
                }));
            }
        };

        if (file) getImage();

        setPost((prevPost) => ({
            ...prevPost,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username,
        }));
    }, [file, account.username, location.search]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const savePost = async () => {
        if (!post.title || !post.description) {
            toast.error('Title and Description are required!');
            return;
        }

        const response = await API.createPost(post);

        if (response?.isSuccess) {
            toast.success('Post published successfully!');
            navigate('/');
        } else {
            toast.error('Failed to publish post!');
            console.log('API response error:', response);
        }
    };

    return (
        <Container>
            <Image src={url} alt="banner" />

            <StyledFormControl>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<Add />}
                    sx={{
                        backgroundColor: '#B9D9EB',
                        color: '#000',
                        '&:hover': { backgroundColor: '#F0F8FF' },
                        [theme => theme.breakpoints.down('sm')]: {
                            width: '100%',
                        },
                    }}
                >
                    Upload Image
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </Button>

                <InputTextField
                    placeholder="Title"
                    onChange={handleChange}
                    name="title"
                />

                <Button
                    variant="contained"
                    onClick={savePost}
                    sx={{
                        [theme => theme.breakpoints.down('sm')]: {
                            width: '100%',
                        },
                    }}
                >
                    Publish
                </Button>
            </StyledFormControl>

            <TextArea
                minRows={5}
                placeholder="Tell your story..."
                onChange={handleChange}
                name="description"
            />
        </Container>
    );
};

export default CreatePost;
