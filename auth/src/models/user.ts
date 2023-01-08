import mongoose, { Mongoose } from "mongoose";
import { Password } from "../services/password";

//Interface needed to create a UserModel
interface UserAttrs{
    email:string;
    password:string;
}

//Inteface shows properties that UserModel has
interface UserModel extends mongoose.Model<UserDocument>{
    build(attrs: UserAttrs):UserDocument
}

//Interface shows that UserDocument has
interface UserDocument extends mongoose.Document{
    email:string;
    password:string;
    createdAt:string;
    updatedAt:string
}

const userSchema = new mongoose.Schema({
    email:{type: String, required:true},
    password:{type: String, required:true}
},{
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});
userSchema.pre('save', async function (done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
});
userSchema.statics.build=(attrs: UserAttrs)=>{
    return new User(attrs);
}

const User = mongoose.model<UserDocument,UserModel>('User', userSchema);

//test
// const user = User.build({email:'abc',password:'123'});
// console.log(user);


// function build(attrs: UserAttrs){
//     return new User(attrs);
// }

export {User};
