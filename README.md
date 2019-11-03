REST API:
GET: /users?username=name&password=password : check if username with password exists
response example:
[
    {
        "userId": 6,
        "username": "admin",
        "password": "5F4DCC3B5AA765D61D8327DEB882CF99"
    }
]
OR
{
    "error": "User with given password not found!"
}

POST: /users?username=name&password=password : create username with password if it doesn't exists
response example:
{
    "recordsets": [],
    "output": {},
    "rowsAffected": [
        1
    ]
}
OR
{
    "error": "errorString"
}

DELETE: /users/userId : delete username with id if it exists
response example:
{
    "recordsets": [],
    "output": {},
    "rowsAffected": [
        1
    ]
}
OR
{
    "error": "errorString"
}

GET: /users/userID/categories : get user's with userID categories
response example:
[
    {
        "name": "Sport",
        "categoryId": 1,
        "userId": 1
    },
    {
        "name": "Fashion",
        "categoryId": 3,
        "userId": null
    }
]
OR
{
    "error": "errorString"
}

GET: /users/userID/news : get user's with userID news
response example:
[
    {
        "category": "Sport",
        "title": "A fan hit David Pastrnak's car in Boston — and he managed to get a picture out of it",
        "pubDate": "Sat, 2 November 2019 19:20:41 -0400",
        "link": "https://www.sportingnews.com/us/nhl/news/a-fan-hit-david-pastrnaks-car-in-boston-and-he-managed-to-get-a-picture-out-of-it/106aglfdfrrd01tbxtkhlzntaz"
    },
    {
        "category": "Sport",
        "title": "LeBron vs. Luka: James, Lakers win spectacular duel in Dallas",
        "pubDate": "Sat, 2 November 2019 09:57:09 -0400",
        "link": "https://www.sportingnews.com/us/nba/news/lebron-vs-luka-james-lakers-win-spectacular-duel-in-dallas/19juuad4mnxjb1kp74k6mkuq0l"
    }
]
OR
{
    "error": "errorString"
}

POST: /users/userID/categoryID : link user with userID with category with cartegoryID
response example:
{
    "recordsets": [],
    "output": {},
    "rowsAffected": [
        1
    ]
}
OR
{
    "error": "errorString"
}

DELETE: /users/userID/categoryID : unlink user with userID with category with cartegoryID
response example:
{
    "recordsets": [],
    "output": {},
    "rowsAffected": [
        1
    ]
}
OR
{
    "error": "errorString"
}