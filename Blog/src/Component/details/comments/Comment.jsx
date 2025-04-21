import { useContext } from "react";
import {
  Box,
  Typography,
  styled,
  IconButton,
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import API from "../../../service/api";
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  background: theme.palette.background.paper,
  padding: "15px",
  borderRadius: "8px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 10px rgba(255, 255, 255, 0.05)"
      : "0 4px 10px rgba(0, 0, 0, 0.05)",
}));

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "16px",
  color: theme.palette.text.primary,
  marginRight: "15px",
}));

const StyledDate = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: theme.palette.text.secondary,
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#ccc" : "#5f6368",
  "&:hover": {
    color: theme.palette.error.main,
  },
}));

const Comment = ({ comment, setToggle }) => {
  const theme = useTheme();
  const { account } = useContext(DataContext);

  const removeComment = async () => {
    const response = await API.deleteComment(comment._id);
    if (response.isSuccess) {
      setToggle((prevState) => !prevState);
    }
  };

  return (
    <Component>
      <Container>
        <Box display="flex" alignItems="center">
          <Name>{comment.name}</Name>
          <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        </Box>
        {comment.name === account.username && (
          <DeleteButton onClick={removeComment}>
            <Delete />
          </DeleteButton>
        )}
      </Container>
      <Box>
        <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
          {comment.comments}
        </Typography>
      </Box>
    </Component>
  );
};

export default Comment;
