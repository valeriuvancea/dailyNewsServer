import { Application, Request, Response } from "express";
import executeQuery from "../tools/sqlWorker";
import * as sql from "mssql";
import isNaturalNumber from "../tools/naturalNumberVerification"

module.exports.set = function (app: Application) {
    app.get('/users/:userId/categories', async (request: Request, response: Response) => {
        const userId: string = request.params.userId;

        if (userId != undefined) {
            if (isNaturalNumber(userId)) {
                const sqlQueryResponse: sql.IResult<any> | Error =
                    await executeQuery(`SELECT c.name, c.categoryId, uc.userId  FROM categories c LEFT JOIN
                        usersWithCategories uc ON c.categoryId = uc.categoryId and uc.userId = ${userId}`);

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
                            error: "User not deleted!"
                        })
                    }
                }
            }
            else {
                return response.status(412).json({
                    error: "userId field provided is not a natural number!"
                })
            }
        }
        else {
            return response.status(412).json({
                error: "userId field not provided!"
            })
        }
    })
}