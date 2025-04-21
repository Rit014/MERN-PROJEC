import { Box, Typography, styled } from '@mui/material';
import { addElipsis } from '../../../utils/common-utils.js';

const Container = styled(Box)`
  border-radius: 20px;
  margin: 16px;
  height: 380px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f0f8ff 0%, #ffffff 100%);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }

  & > p {
    padding: 0 12px 6px 12px;
  }
`;

const Image = styled('img')`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
  transition: transform 0.3s ease;

  ${Container}:hover & {
    transform: scale(1.02);
  }
`;

const Text = styled(Typography)`
  color: #6c757d;
  font-size: 13px;
  margin-top: 8px;
  padding: 0 12px;
`;

const Heading = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  margin: 8px 0;
  text-align: center;
  background: linear-gradient(135deg, #b0e0e6, #4682b4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #0047ab, #1ca9c9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Details = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.mode === 'dark' ? '#000' : '#444',
    padding: '0 16px 12px',
    lineHeight: '1.5em',
    maxHeight: '4.5em', // 1.5em * 3 lines
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  }));
  

const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : 'https://images.unsplash.com/photo-1683041133704-1de1c55d050c?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <Container>
      <Image src={url} alt="blog" />
      <Text>{post.categories}</Text>
      <Heading>{addElipsis(post.title, 20)}</Heading>
      <Text><span style={{ fontWeight: 'bold', color: 'black'}}>by:</span> {post.username}</Text>
      <Details>{post.description}</Details>

    </Container>
  );
};

export default Post;
