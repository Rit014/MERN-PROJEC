import { Box, Typography, styled } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../service/api.js';
import { Edit, Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider.jsx';
import Comments from './comments/comments.jsx';

const Container = styled(Box)(({ theme }) => ({
  margin: '0 20px',
  [theme.breakpoints.up('sm')]: {
    margin: '0 100px',
  },
  padding: '20px 0',
}));

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '60vh',
  objectFit: 'cover',
  borderRadius: '8px',
});

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 700,
  textAlign: 'center',
  margin: '40px 0 20px 0',
  color: theme.palette.mode === 'dark' ? '#f5f5f5' : '#333',
  wordBreak: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px', // Smaller size for small screens
  },
}));



const ActionContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: -40px;
  margin-bottom: 20px;
`;

const IconButton = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Author = styled(Box)`
  color: #878787;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled(Typography)(({ theme }) => ({
  wordBreak: 'break-word',
  fontSize: '16px',
  lineHeight: 1.6,
  marginBottom: '30px',
  color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#444', // Light text in dark mode, dark in light mode
}));


const DetailView = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { account } = useContext(DataContext);

  const url = post.picture
    ? post.picture
    : 'https://images.unsplash.com/photo-1683041133704-1de1c55d050c?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]);

  const deleteBlog = async () => {
    const response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate('/');
    }
  };

  return (
    <Container>
      {/* Post Image */}
      <Image src={url} alt="blog" />

      {/* Action Icons for Edit and Delete */}
      {account.username === post.username && (
        <ActionContainer>
          <Link to={`/update/${post._id}`}>
            <IconButton>
              <Edit style={{ color: '#4CAF50', fontSize: '24px' }} /> {/* Professional green color */}
            </IconButton>
          </Link>
          <IconButton onClick={deleteBlog}>
            <Delete style={{ color: '#F44336', fontSize: '24px' }} /> {/* Professional red color */}
          </IconButton>
        </ActionContainer>
      )}

      {/* Post Heading */}
      <Heading>{post.title}</Heading>

      {/* Author and Date */}
      <Author>
        <Typography>Author: <Box component="span" style={{ fontWeight: 600 }}>{post.username}</Box></Typography>
        <Typography>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>

      {/* Post Description */}
      <Description>{post.description}</Description>

      {/* Comments Section */}
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
