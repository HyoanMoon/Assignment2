//Step 1 -import Mongoose 
import mongoose, { PassportLocalSchema } from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema
import passportLocalMongoose from 'passport-local-mongoose';

//Step 2 - Creat a Schema that matches the data 
const UserSchema = new Schema 
({
    DispalyName : String,
    username: String,
    EmailAddress: String,
    Created:
    {
        type: Date,
        default: Date.now()
    },
    Updated:
    {
        type: Date,
        default: Date.now()
    },
},
{
    collection: "users"
})

declare global 
{
    export type UserDocument =mongoose.Document & 
    {
        username : String,
        EmailAddress: String,
        DispalyName : String,
    }

}


// Step 3 - plugin the passport local mongoose module
UserSchema.plugin(passportLocalMongoose);



//Step 4 - Create a Model using the Schema
const Model = mongoose.model("User", UserSchema as PassportLocalSchema);

//Step 5 - Export the model -> This makes the file a module
export default Model;
