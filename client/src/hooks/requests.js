const API_URL = 'http://localhost:8000/api/v0'

//Load games and return as JSON
async function httpGetGames(){
    try{
        const response = await fetch(`${API_URL}/games`);
        const gamesJSON = await response.json();
        return gamesJSON.games;
    }catch(err){
        console.log(err)
        return {}
    }
    
}

//Get Signed Url
async function getSignedUrl(fileName){
    const response = await fetch(`${API_URL}/games/signed-url/${fileName}`);
    const signed_url = await response.json();
    return signed_url.url;
}


//Create game
async function httpCreateGame(game){
    console.log(game)
    const fileName = game.image.name;
    const signedUrl = await getSignedUrl(fileName);
    if(signedUrl){
        await fetch(signedUrl, {
            method: 'put',
            headers: {
                'Content-Type': 'image/jpeg'
            },
            body: game.image
        })
    }else{
        return {
            ok: false
        }
    }

    const images = [{
        id: 1,
        url: fileName,
        type: 'image/jpeg'
    }]

    game.images = images
    game.fileName = fileName

    try{
        return await fetch(`${API_URL}/games`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        })
    } catch(err){
        return{
            ok: false
        }
    }
}

//Delete game with given id
async function httpDeleteGame(id){
    try{
        return await fetch(`${API_URL}/games/${id}`, {
            method: 'delete'
        });
    }catch(err){
        console.log(err);
        return {
            ok: false
        }
    }
}

export {
    httpGetGames,
    httpCreateGame,
    httpDeleteGame
}
