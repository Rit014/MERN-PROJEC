import mongoose from 'mongoose';

const tokensSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
})

const token = mongoose.model('token', tokensSchema);

export default token;