import {Application, Request, Response} from "express";
import executeQuery from "../tools/sqlWorker";
import * as sql from "mssql";

module.exports.set = function (app:Application) {
    app.get('/users', async (request: Request, response: Response) => {
        const username: string = request.query.username;
        const password: string = request.query.password;

        if (username != undefined && password != undefined) {
            const sqlQueryResponse: sql.IResult<any> | Error =
                await executeQuery(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`);

            if (sqlQueryResponse instanceof Error) {
                return response.status(500).json({
                    error: sqlQueryResponse.stack
                })
            }
            else {
                if (sqlQueryResponse.recordset.length > 0) {
                    return response.json(sqlQueryResponse.recordset)
                }
                else {
                    return response.status(404).json({
                        error: "User with given password not found!"
                    })
                }
            }
        }
        else {
            return response.status(412).json({
                error: "username and password fields not provided!"
            })
        }
    })
}