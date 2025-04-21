import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async (request, response) => {

    try {
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = { username: request.body.username, name: request.body.name, email: request.body.email, password: hashedPassword }

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'signup successfully' })
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signup the user' })
    }
}

export const loginUser = async (request, response) => {
    try {
        let user = await User.findOne({
            $or: [
                { username: request.body.identifier },
                { email: request.body.identifier }
            ]
        });

        if (!user) {
            return response.status(400).json({ msg: 'Username does not match' });
        }

        let match = await bcrypt.compare(request.body.password, user.password);
        if (!match) {
            return response.status(400).json({ msg: 'Password does not match' });
        }

        const payload = {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email
        };


        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY);


        await Token.create({ token: refreshToken });

        return response.status(200).json({ accessToken, refreshToken, name: user.name, username: user.username });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: 'Error while logging in user' });
    }
};

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.body.token;
  
    if (!refreshToken) {
      return res.status(401).json({ msg: "Refresh token required" });
    }
  
    // Check if the refresh token exists in the database
    const storedToken = await Token.findOne({ token: refreshToken });
    if (!storedToken) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }
  
    try {
      // Verify the refresh token
      const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
      
      // Generate a new access token
      const newAccessToken = jwt.sign(
        { id: userData.id, username: userData.username, name: userData.name },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: '15m' }
      );
  
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(403).json({ msg: "Invalid or expired refresh token" });
    }
  };
