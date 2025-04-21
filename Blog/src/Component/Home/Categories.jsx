import React from 'react';
import { Button, Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data';

const StyledButton = styled(Button)`
  margin: 20px;
  background: #6495ed;
  color: #ffffff;
`;

const CategoryCard = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
    padding: theme.spacing(1.5),
    textAlign: 'center',
    borderRadius: '12px',
    transition: '0.3s',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '160px',
    margin: 'auto',
    backgroundColor: selected ? '#A3C1AD' : '#ffffff',
    '&:hover': {
        transform: 'scale(1.05)',
        backgroundColor: selected ? '#A3C1AD' : '#f0f8ff',
    },
}));

const CategoryText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
    fontSize: '13px',
    fontWeight: 600,
    color: selected ? '#ffffff' : '#000000',
    transition: 'color 0.3s ease',
}));

const Categories = () => {
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category');

    return (
        <Box sx={{ padding: 2 }}>
            <Link to={`/create?category=${selectedCategory || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton
                    sx={{
                        background: 'linear-gradient(135deg, #b0e0e6 0%, #4682b4 100%)',
                        color: '#fff',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        borderRadius: '12px',
                        padding: '10px 20px',
                        width: {
                            xs: '80%',
                            sm: '40%',
                            md: '20%',
                        },
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #0047ab 0%, #1ca9c9 100%)',
                            // transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                        },
                    }}
                >
                    Create Blog
                </StyledButton>

            </Link>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6} sm={4} md={3} lg={2}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <CategoryCard selected={!selectedCategory}>
                            <CategoryText selected={!selectedCategory}>
                                All Categories
                            </CategoryText>
                        </CategoryCard>
                    </Link>
                </Grid>
                {categories.map((cat) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={cat.id}>
                        <Link to={`/?category=${cat.type}`} style={{ textDecoration: 'none' }}>
                            <CategoryCard selected={selectedCategory === cat.type}>
                                <CategoryText selected={selectedCategory === cat.type}>
                                    {cat.type}
                                </CategoryText>
                            </CategoryCard>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Categories;
