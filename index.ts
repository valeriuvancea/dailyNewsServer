const express = require("express");
import executeQuery from "./sqlWorker";
const app = express();
import * as sql from "mssql";
import { Request, Response } from 'express';
require('dotenv').config();

var port = process.env.PORT || 8080;

app.get('/users', async (request:Request, response:Response) => {
    const username:string = request.query.username;
    const password:string = request.query.password;

    if(username != undefined && password != undefined) {
         const sqlQueryResponse:sql.IResult<any> | Error = 
         await executeQuery(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`);

         if(sqlQueryResponse instanceof  Error) {
            return response.status(500).json({
                error: sqlQueryResponse.stack
            })
         }
         else {
             if (sqlQueryResponse.recordset.length > 0)
             {
                 return response.json({
                     userId: "1"
                 })
             }
             else
             {
                 return response.status(404).json({
                     error: "User with given password not found!"
                 })
             }
         }
    }
    else
    {
        return response.status(412).json({
            error: "username and password fields not provided!"
        })
    }
})

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});