import { Application, Request, Response } from "express";
import executeQuery from "../tools/sqlWorker";
import * as sql from "mssql";

module.exports.set = function (app: Application) {
    app.post('/users', async (request: Request, response: Response) => {
        const username: string = request.query.username;
        const password: string = request.query.password;

        if (username != undefined && password != undefined) {
            const sqlQueryResponse: sql.IResult<any> | Error =
                await executeQuery(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`);

            if (sqlQueryResponse instanceof Error) {
                return response.status(500).json({
                    error: sqlQueryResponse.stack
                })
            }
            else {
                if (sqlQueryResponse.rowsAffected.length > 0) {
                    return response.json(sqlQueryResponse)
                }
                else {
                    return response.status(404).json({
                        error: "User not inserted!"
                    })
                }
            }
        }
        else {
            return response.status(412).json({
                error: "userId field not provided!"
            })
        }
    })
}