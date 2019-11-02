import { Application, Request, Response } from "express";
import executeQuery from "../tools/sqlWorker";
import * as sql from "mssql";
import isNaturalNumber from "../tools/naturalNumberVerification"
const Parser = require('rss-parser');
const parser = new Parser();

module.exports.set = function (app: Application) {
    app.get('/users/:userId/news', async (request: Request, response: Response) => {
        const userId: string = request.params.userId;

        if (userId != undefined) {
            if (isNaturalNumber(userId)) {
                const sqlQueryResponse: sql.IResult<any> | Error =
                    await executeQuery(`SELECT c.name, c.rssLink, uc.userId  FROM categories c LEFT JOIN
                        usersWithCategories uc ON c.categoryId = uc.categoryId and uc.userId = ${userId}`);

                if (sqlQueryResponse instanceof Error) {
                    return response.status(500).json({
                        error: sqlQueryResponse.stack
                    })
                }
                else {
                    if (sqlQueryResponse.recordset.length > 0) {
                        let news = new Array();
                        let error: any;
                        for (let i:number = 0; i < sqlQueryResponse.recordset.length; i++)
                        {
                            let record = sqlQueryResponse.recordset[i]; 
                            let parserResult: any;

                            if (record.userId == null) {
                                continue;
                            }

                            await new Promise(async (resolve, reject) => {
                                try {
                                    const feed = await parser.parseURL(record.rssLink);
                                    resolve(feed);
                                }
                                catch (error) {
                                    reject(error);
                                }
                            }).then(feed => parserResult = feed).catch(err => error = err);

                            if(error !== undefined)
                            {
                                return response.status(500).json({
                                    error: "RSS Parser Error!"
                                })   
                            }

                            parserResult.items.forEach((item:any) =>{
                                news.push({
                                    category: record.name,
                                    title: item.title,
                                    pubDate: item.pubDate,
                                    link: item.link
                                });
                            })
                        }

                        news = news.sort((a, b) => (new Date(a.date) as any) - (new Date(b.date) as any));
                       
                        return response.json(news)
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