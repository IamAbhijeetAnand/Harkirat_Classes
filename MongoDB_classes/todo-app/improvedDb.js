const mongoose = require("mongoose");

//Step1. we will create the schema of the table

//Now the most important question arrise here, we know that the mongoDB is schema less but here we are
//Designing the schema why???
//But why we are defing the schema when usung the mongoose library??


//How can we defing the schema for the mongoose library-> mongoose exports a class called schema that we can use to define the schema
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.connect("mongodb+srv://icyninja45:ev0CDKBUH6QdAF1c@abhijeetcluster.vjvwpgq.mongodb.net/todo-app-database")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));

//Our User Schema will look like this
const User = new Schema({
    email: {
        type: String,
        unique: true,
        match: /.+\@.+\..+/,
        lowercase: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    name: {
        type:String,
        required: true
    }
});

const Todo = new Schema({
    description: String,
    done: { type: Boolean, default: false },
    //userId: ObjectId, //This we need to import from the mongoose -> We had import it at the top as const ObjectId=mongoose.ObjectId;
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    dueDate: Date
}, { timestamps: true });


//What doees the mongoose.model give the ('First Which collection you want to put',and schema name here)
const UserModel = mongoose.model('users', User);
//Here the above line states that i want to put data in 'users' collection and the Schema is User
//i.e; 'users' is the name of the collection where data will be put and the strcture of the data is 'User' schema

const TodoModel = mongoose.model('todos', Todo);


//Now at the end we have to export the upper 2 variables so that we can immport or access them in other file
module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}
//Above we are exporting an object where the first key is "UserModel" and the second ket is "TodoModel"
//So that we can import these in the index.js file