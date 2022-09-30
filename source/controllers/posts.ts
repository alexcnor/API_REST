/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
//import fetch from 'node-fetch';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Entraaaaaaa updatePost id")
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });

    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Entraaaaaaa deletePost id")
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Entraaaaaaa addPost ")
    /*
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
*/ 
//********************************************************************************************** */
let IdPipeline: string = req.body.IdPipeline;
let UrlAzurePL: string = "https://dev.azure.com/tecnoandinaspa/service-catalog/_apis/pipelines/" + IdPipeline + "/runs?api-version=6.0-preview.1";

let data = {
    "templateParameters": {
        "A_Parameter": req.body.A_Parameter,
        "B_Parameter": req.body.B_Parameter,
        "C_Parameter": req.body.C_Parameter
    }
};
 
console.log(data)

interface Resultado {
    state: string;
    createdDate: string;
    url: string;
    id: number;
    name: string;
    result: string;
}

//let A_url = 'URL : ';

//the URL of the website to which the content must be posted is passed as a parameter to the fetch function along with specifying the method, body and header
//'Authorization': 'Basic ' + btoa("" + ":" + '3kzb4jt7rhujxkaiap6bjjf6qkbnjgypye6zfum2hs3pb2r6e5nq') : Este Key se genera desde azure Personal Access Token
//let fetch = await import('node-fetch');
const fetch = require('node-fetch');
fetch(UrlAzurePL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa("" + ":" + '3kzb4jt7rhujxkaiap6bjjf6qkbnjgypye6zfum2hs3pb2r6e5nq'),
    }
})
//then() function is used to convert the posted contents to the website into json format
.then((result: { json: () => any; }) => result.json())
//.then((result: any) => console.log(result))
//the posted contents to the website in json format is displayed as the output on the screen
//.then(jsonformat=>console.log(jsonformat));

.then((jsonformat: { json: () => any; }) => {
    console.log(jsonformat)
    const resulta = <Resultado><unknown>jsonformat
    console.log(resulta.url)
    console.log(resulta.state)
}
);
 
//********************************************************************************************** */
   //console.log(res)
    return res.status(200).json({
        message: 'OK 200'//response.data
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost };