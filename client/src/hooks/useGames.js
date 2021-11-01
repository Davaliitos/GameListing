import { useCallback, useEffect, useState } from "react";

import { httpGetGames, httpCreateGame, httpDeleteGame } from './requests'

function useGames(onSuccessSound, onAbortSound, onFailureSound) {
    const [games, saveGames] = useState([]);
    const [isPendingCreation, setPendingCreation]= useState(false)

    // Get Games Hook
    const getGames = useCallback(async () => {
        const fetchedGames = await httpGetGames();
        saveGames(fetchedGames);
    },[])

    useEffect(() => {
        getGames();
    },[getGames]);


    // SubmitGame hook
    const createGame = useCallback(async (formData) => {
        
        setPendingCreation(true);
        const response = await httpCreateGame(formData)

        const success = response.ok;
        if(success){
            getGames();
            setTimeout(() => {
                setPendingCreation(false);
                onSuccessSound();
            },800)
        }else{
            onFailureSound()
        }

    },[getGames, onSuccessSound, onFailureSound])


    const deleteGame = useCallback(async (id) => {
        const response = await httpDeleteGame(id);

        const success = response.ok;
        if(success){
            getGames();
            onAbortSound();
        }else{
            onFailureSound();
        }
    },[getGames, onAbortSound, onFailureSound])

    return {
        games,
        deleteGame,
        createGame,
        isPendingCreation
    };
}

export default useGames;