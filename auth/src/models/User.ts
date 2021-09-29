import mongoose from 'mongoose'

interface UserAttrs {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttrs): UserDocument;
}

interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const reqString = {
    type: String,
    required: true
};

const userSchema = new mongoose.Schema({
    email: reqString,
    password: reqString
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
