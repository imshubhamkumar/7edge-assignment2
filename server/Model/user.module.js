const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    pass:{
        type: String,
        required: true
    },
    eid: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    createTime: {
        type: String
    },
    updateTime: {
        type: String
    }
});

validPassword = (password) => {
    return (this.pass == password);
}

const users = mongoose.model('user', UserSchema);

module.exports = users;