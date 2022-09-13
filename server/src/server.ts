import express from "express";


const app = express();

app.get('/users',(request, response)=>{
    return response.json([
        {
            id: 1,
            name: "Fábio Junik",
            age: 19
        },
        {
            id: 2,
            name: "António Muteka",
            age: 18
        },
    ])
})


app.listen(5000,()=>console.log("Server is runnig in port 5000"));