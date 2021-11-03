import { useState } from 'react';
import { Switch, Route} from 'react-router-dom'
import { Frame, withSounds, withStyles } from 'arwes'

import useGames from '../hooks/useGames';

import Centered from '../components/Centered';
import Header from '../components/Header';

import ListGames from './ListGames';
import CreateGame from './CreateGame';

const styles = () => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        margin: 'auto'
    },
    centered: {
        flex: 1,
        paddingTop: '20px',
        paddingBottom: '10px'
    }
})

const AppLayout = props => {
    const { sounds, classes } = props;
    const [frameVisible, setFrameInvisible] = useState(true);
    const animateFrame = () => {
        setFrameInvisible(false);
        setTimeout(() => {
            setFrameInvisible(true)
        },600)
    }

    const onSuccessSound = () => sounds.success && sounds.success.play();
    const onAbortSound = () => sounds.abort && sounds.abort.play();
    const onFailureSound = () => sounds.warning && sounds.warning.play();

    const { games, isPendingCreation, createGame, deleteGame } = useGames(onSuccessSound, onAbortSound, onFailureSound)

    return <div className={classes.content}>
        <Header onNav={animateFrame}/>
        <Centered className={classes.centered}>
            <Frame animate
                show={frameVisible}
                corners={4}
                style={{visibility: frameVisible ? 'visible' : 'hidden' }}
            >
                {
                    anim => (
                        <div style={{padding: '20px'}}>
                        <Switch>
                            <Route exact path='/'>
                                <ListGames
                                    entered={anim.entered}
                                    games={games}
                                    deleteGame={deleteGame}
                                />
                            </Route>
                            <Route exact path='/create'>
                                <CreateGame
                                    entered={anim.entered}
                                    createGame={createGame}
                                    isPendingCreation={isPendingCreation}
                                />
                            </Route>
                        </Switch>
                        </div>
                    )
                }
            </Frame>
        </Centered>
    </div>
}

export default withSounds()(withStyles(styles)(AppLayout));