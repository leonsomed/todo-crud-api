import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name: String,
    title: String,
    completed: Boolean,
}, { versionKey: false });

export default mongoose.model('todo', schema, 'todos');