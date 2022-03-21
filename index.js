const express = require("express");
const mongoose= require("mongoose");

const app=express();

const connect=()=>{

    return mongoose.connect("mongodb+srv://rahulkishore425:kishore_1995@myfirstdatabasecluster0.ad5cz.mongodb.net/UNIT4C3?authSource=admin&replicaSet=atlas-kc6aw3-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true");

};

// users schema

const usersSchema=new mongoose.Schema(
    {
        firstName:{type:String,require:true},
        lastName:{type:String,require:true},
        age:{type:Number,require:true},
        email:{type:String,require:true,unique:true},
        profileImages:{type:String,require:true}
    },
    {
        versionKey:false,
        timestamps:true
    }
)
const User=mongoose.model("users",usersSchema);


// books schema

const  booksSchema=new mongoose.Schema(
    {
        likes:{type:String,require:true},
        coverImage:{type:String,require:true},
        content:{type:Number,require:true},
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            require:true
        }
        
    },
    {
        versionKey:false,
        timestamps:true
    }
)
const Books=mongoose.model(" books", booksSchema);

// publicatation schema

const  publicatationSchema=new mongoose.Schema(
    {
        name:{type:String,require:true},
        body:{type:String,require:true},
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            require:true
        },
        booksId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"books",
            require:true
        }

    },
    {
        versionKey:false,
        timestamps:true
    }
)
const Publicatation=mongoose.model("publicatation", publicatationSchema);

// users schema

const commentSchema =new mongoose.Schema(
    {
        body:{type:String,require:true},   
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            require:true
        },
        booksId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"books",
            require:true
        }
    },
    {
        versionKey:false,
        timestamps:true
    }
)
const Comment=mongoose.model("comment", publicatationSchema);


app.get("/users",async(req,res)=>{
    try {
        const users=await User.find().lean().exec();
        return res.status(200).send({users:users});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})

app.post("/users",async(req,res)=>{
    try {
        const users=await User.create(req.body);
        return res.status(201).send(users);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})
app.get("/books",async(req,res)=>{
    try {
        const books=await Books.find().lean().exec();
        return res.status(200).send({books:books});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})

app.post("/books",async(req,res)=>{
    try {
        const books=await Books.create(req.body);
        return res.status(201).send(books);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})

app.get("/publicatation",async(req,res)=>{
    try {
        const publicatation=await Publicatation.find().lean().exec();
        return res.status(200).send({publicatation:publicatation});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})

app.post("/publicatation",async(req,res)=>{
    try {
        const publicatation=await Publicatation.create(req.body);
        return res.status(201).send(publicatation);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})

app.get("/comment",async(req,res)=>{
    try {
        const comment=await Comment.find().lean().exec();
        return res.status(200).send({comment:comment});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})

app.post("/comment",async(req,res)=>{
    try {
        const comment=await Comment.create(req.body);
        return res.status(201).send(comment);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})
app.listen(5000,async()=>{
    try {
        await connect();
    } catch (error) {
        console.log("err:",err)
    }
    console.log("listining on port 5000");
});