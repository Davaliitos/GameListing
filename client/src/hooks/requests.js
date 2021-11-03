const API_URL = 'api/v0';

//Load games and return as JSON
async function httpGetGames(){
    try{
        const response = await fetch(`${API_URL}/games`);
        const gamesJSON = await response.json();
        return gamesJSON.listings;
    }catch(err){
        console.error(err)
        return []
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
        try{
            await fetch(signedUrl, {
                method: 'put',
                headers: {
                    'Content-Type': 'image/jpeg'
                },
                body: game.image
            })
        }catch(err){
            console.log()
        }
        
    }else{
        return {
            ok: false
        }
    }

    const images = [{
        id: 1,
        url: fileName,
        type: Number(game.imageType)
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
