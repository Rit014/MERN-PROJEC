import React from 'react';
import { Box, styled, Typography, Button } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
    padding: '50px 20px',
    maxWidth: '1100px',
    margin: '0 auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
        margin: '0 15px',
    },
}));

const HeroSection = styled(Box)`
    text-align: center;
    margin-bottom: 40px;
`;

const HeroImage = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    objectFit: 'cover',
    maxHeight: '400px',
});

const SectionTitle = styled(Typography)`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;

const Paragraph = styled(Typography)`
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 20px;
`;

const AboutPage = () => {
    return (
        <Container>
            {/* Hero Section */}
            <HeroSection>
                <HeroImage 
                    src="https://images.unsplash.com/photo-1506748686210-2b1de5c67b8d" 
                    alt="About Us" 
                />
                <SectionTitle>Welcome to Our Blog</SectionTitle>
                <Paragraph>
                    This is the place where you can explore informative articles, tutorials, and stories
                    that empower you to learn and grow. Our goal is to provide valuable content for anyone
                    looking to deepen their knowledge in the world of technology, development, and more.
                </Paragraph>
            </HeroSection>

            {/* Mission Section */}
            <Box mb={5}>
                <SectionTitle>Our Mission</SectionTitle>
                <Paragraph>
                    Our mission is to provide high-quality content to developers and learners at all levels.
                    Whether you're just starting out or an experienced developer, we want to help you succeed 
                    with easy-to-understand articles and tutorials on various topics in software development.
                </Paragraph>
            </Box>

            {/* Team or Author Section */}
            <Box mb={5}>
                <SectionTitle>The Team</SectionTitle>
                <Paragraph>
                    The blog is authored by a passionate developer who is committed to sharing knowledge and 
                    providing practical insights to help others in their coding journey. 
                </Paragraph>
                <Paragraph>
                    <strong>Author:</strong> Jane Doe, Frontend Developer and Technology Enthusiast
                </Paragraph>
            </Box>

            {/* Call to Action Section */}
            <Box textAlign="center">
                <Button 
                    variant="contained" 
                    color="primary" 
                    href="mailto:contact@yourdomain.com"
                >
                    Contact Us
                </Button>
            </Box>
        </Container>
    );
};

export default AboutPage;
