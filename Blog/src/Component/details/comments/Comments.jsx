import { useState, useContext, useEffect } from "react";
import {
  Box,
  TextareaAutosize,
  Button,
  styled,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataContext } from "../../../context/DataProvider";
import API from "../../../service/api.js";
import { toast } from "react-toastify";
import Comment from "./comment.jsx";

const Container = styled(Box)`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CommentInputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: "15px",
  background: theme.palette.background.paper,
  borderRadius: "8px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 15px rgba(255, 255, 255, 0.05)"
      : "0 4px 15px rgba(0, 0, 0, 0.05)"
}));

const UserAvatar = styled("img")({
  width: 40,
  height: 40,
  borderRadius: "50%",
  marginRight: "15px"
});

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  padding: "10px",
  fontSize: "14px",
  lineHeight: 1.5,
  borderRadius: "8px",
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 1px 3px rgba(255, 255, 255, 0.1)"
      : "0px 1px 3px rgba(0, 0, 0, 0.1)",
  resize: "none",
  outline: "none",
  transition: "border-color 0.3s ease",
  "&:focus": {
    borderColor: "#6495ed"
  }
}));

const SubmitButton = styled(Button)`
  margin-top: 10px;
  background: #6495ed;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  padding: 8px 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1f65e0;
  }
`;

const initialValues = {
  name: "",
  postId: "",
  comments: "",
  date: new Date()
};

const Comments = ({ post }) => {
  const theme = useTheme();
  const url = "https://static.thenounproject.com/png/12017-200.png";
  const [comment, setComments] = useState(initialValues);
  const [comments, setComment] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { account } = useContext(DataContext);

  useEffect(() => {
    if (account?.username && post?._id) {
      setComments((prev) => ({
        ...prev,
        name: account.username,
        postId: post._id
      }));
    }
  }, [account, post]);

  useEffect(() => {
    const getData = async () => {
      const response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setComment(response.data);
      }
    };
    getData();
  }, [post, toggle]);

  const handleChange = (e) => {
    setComments({
      ...comment,
      comments: e.target.value
    });
  };

  const addComment = async () => {
    if (!comment.comments.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    const response = await API.newComment(comment);

    if (response.isSuccess) {
      toast.success("Comment posted!");
      setComments({
        ...initialValues,
        name: account.username,
        postId: post._id
      });
      setToggle((prevState) => !prevState);
    } else {
      toast.error("Failed to post comment. Try again.");
    }
  };

  return (
    <Container>
      <CommentInputBox>
        <UserAvatar src={url} alt="User Avatar" />
        <Box sx={{ flex: 1 }}>
          <StyledTextArea
            minRows={5}
            placeholder="Share your thoughts..."
            value={comment.comments}
            onChange={handleChange}
          />
          <SubmitButton onClick={addComment}>Post Comment</SubmitButton>
        </Box>
      </CommentInputBox>

      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment, index) => (
            <Comment key={index} comment={comment} setToggle={setToggle} />
          ))}
      </Box>
    </Container>
  );
};

export default Comments;
