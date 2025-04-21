import React, { useState } from 'react';
import { Box, styled, TextField, Button, Typography, Alert } from '@mui/material';

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

const SectionTitle = styled(Typography)`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;

const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 20px;

    & .MuiInputBase-root {
        font-size: 16px;
    }
`;

const ButtonStyled = styled(Button)`
    margin-top: 20px;
    padding: 12px 25px;
    background-color: #1976d2;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    text-transform: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #1565c0;
    }

    &:active {
        background-color: #0d47a1;
    }
`;

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState(null); // For success or error message

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Here you can integrate an API call to send the form data, for now, we'll simulate success.
            // Example: await API.sendContactForm(formData);

            setFormStatus({
                type: 'success',
                message: 'Your message has been sent successfully!',
            });

            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setFormStatus({
                type: 'error',
                message: 'There was an issue sending your message. Please try again.',
            });
        }
    };

    return (
        <Container>
            <SectionTitle>Contact Us</SectionTitle>

            <Typography variant="body1" align="center" paragraph>
                We’d love to hear from you! Please reach out if you have any questions, feedback, or just want to say hi.
            </Typography>

            {/* Show success/error message */}
            {formStatus && (
                <Alert severity={formStatus.type} style={{ marginBottom: '20px' }}>
                    {formStatus.message}
                </Alert>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
                <StyledTextField
                    label="Your Name"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <StyledTextField
                    label="Your Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <StyledTextField
                    label="Your Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                />

                <ButtonStyled type="submit" variant="contained">
                    Send Message
                </ButtonStyled>
            </form>

            {/* Additional Contact Information */}
            <Box mt={5} textAlign="center">
                <Typography variant="body1">
                    Or reach us via email: <strong>contact@yourdomain.com</strong>
                </Typography>
            </Box>
        </Container>
    );
};

export default ContactPage;
