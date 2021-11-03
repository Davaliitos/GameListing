# Unity Games Listing

Unity Games Listing allows users to register and create games

### Prerequisite
1. The depends on the Node Package Manager (NPM). You will need to download and install Node from [https://nodejs.com/en/download](https://nodejs.org/en/download/). This will allow you to be able to run `npm` commands.
2. Environment variables will need to be set. These environment variables include database connection details that should not be hard-coded into the application code.

## Setting up the REST API server

1. Clone this repository locally.

2. Install dependencies using 

```bash
npm install
```

3. Start your app using

```bash
npm run dev
```


# Functionality of the application

This application will allow creating/removing/fetching games.

# Game Item

The application stores GameItems, each GameItem contains the following fields:

* `gameId` (string) - a unique id for a game
* `category` (string) - name of the category
* `title` (string) - title of a GameItem (e.g. "Xenoblade Chronicles")
* `subtitle` (string) - subtitle of a GameItem
* `description` (string) - description of a GameItem
* `author` (string) - author of a GameItem
* `duration` (number) - number of minutes required to beat a game
* `isDownloadable` (boolean) - true if the game can be downloaded
* `isStreamable` (boolean) - true if the game can be streamed
* `isPremium` (boolean) - true if the game belongs to the premium service
* `images` (array) - array of image objects
  * `id` (string) - an id for an image
  * `url` (string) - the signed url of the image stored on an S3 Bucket
  * `type` (number) - the image type, used by the Unity Web project

# Implemented Functions

* `GetGames` - returns all games.

It should return data that looks like this:

```json
{
  "listings": [
    {
      "gameId": "38cdfad2-e110-4bce-8676-a3faaa6e38c7",
      "title": "Witcher 3",
      "subtitle": "The Wild Hunt",
      "author": "CD Project RED",
      "category": "Action RPG",
      "description": "You play as a bounty hunter...",
      "duration": 100,
      "images": [{
          "id": "1",
          "url": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png",
          "type": 1
      }],
      "isDownloadable": true,
      "isStreamable": true,
      "isPremium": true,
      "version": 1
    }
  ]
}
```

* `CreateGame` - creates a new GameItem. A shape of data send by a client application to this function can be found in the `GameItem.ts` file

It received a new GameItem to be created in JSON format that looks like this:

```json
{
    "gameId":"5329c6f3-fd91-4c1d-9d53-daf7fb966722",
    "title":"Red Dead Redemption 2",
    "subtitle":"Rockstar Games",
    "category":"Action",
    "description":"Winner of over 175 Game of the Year...",
    "author":"Rockstar Games",
    "duration":123,
    "isDownloadable":true,
    "isStreamable":true,
    "images":[{
        "id":1,
        "url":"Red_Dead_Redemption_II.jpg",
        "type":1
    }],
    "isPremium":false,
    "version":1
}
```

It should return a new GameItem with the image signed url

* `DeleteTodo` - deletes a TODO item created by a current user. Expects an id of a TODO item to remove.

Returns an empty body

* `SignedUrl` - returns a pre-signed URL that can be used to upload an image file for a Game item.

Returns a JSON object that looks like this:

```json
{
  "url": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```
