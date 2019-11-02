import { Application, Request, Response } from "express";
import executeQuery from "../tools/sqlWorker";
import * as sql from "mssql";
import isNaturalNumber from "../tools/naturalNumberVerification"

module.exports.set = function (app: Application) {
    app.delete('/users/:userId/:categoryId', async (request: Request, response: Response) => {
        const userId: string = request.params.userId;
        const categoryId: string = request.params.categoryId;

        if (userId != undefined && categoryId != undefined) {
            if (isNaturalNumber(userId) && isNaturalNumber(categoryId)) {
                const sqlQueryResponse: sql.IResult<any> | Error =
                    await executeQuery(`DELETE FROM usersWithCategories WHERE userId = ${userId} AND categoryId = ${categoryId}`);

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
                            error: "User not updated!"
                        })
                    }
                }
            }
            else {
                return response.status(412).json({
                    error: "userId field and/or categoryId field provided are not natural number!"
                })
            }
        }
        else {
            return response.status(412).json({
                error: "userId and/or categoryId fields not provided!"
            })
        }
    })
}