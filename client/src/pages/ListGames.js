import { useMemo } from 'react';
import { Appear, Table, Paragraph, Link, Words, withStyles } from 'arwes';

import Clickable from '../components/Clickable';

const styles = () => ({
    link: {
        color: 'red',
        textDecoration: 'none'
    },
    image:{
        height: '80px'
    },
    firstColumn:{
        width: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    table:{
        overflow: 'auto',
        '& td': {
            'padding': '8px 16px'
        }
    },
    article:{
        overflow: 'auto'
    }
})

const imageTypes= [
    'Unset',
    'Background',
    'Featured',
    'Logo',
    'Icon'
]


const ListGames = props => {

    const {
        entered,
        games,
        classes,
        deleteGame
    } = props;



    const tableBody = useMemo(() => {
        return games?.map(game => {

            const {images} = game;

            return <tr key={game.gameId}>
                <td className={classes.firstColumn}>
                    <Clickable style={{color: 'red'}}>
                        <Link className={classes.link} onClick={() => deleteGame(game.gameId)}>
                            ✖
                        </Link>
                    </Clickable>
                </td>
                <td>
                    {
                        images && images[0] && (
                            <img
                                src={images[0]?.url}
                                className={classes.image}
                                alt='test'
                            />
                        )
                    }
                </td>
                <td>{game.title}</td>
                <td>{game.subtitle}</td>
                <td>{game.category}</td>
                <td>{game.description}</td>
                <td>{game.author}</td>
                <td>{
                    images && images[0] && imageTypes[images[0].type]
                }</td>
                <td>{game.duration}</td>
                <td>{game.isDownloadable && <span>✓</span>}</td>
                <td>{game.isStreamable && <span>✓</span>}</td>
                <td>{game.isPremium && <span>✓</span>}</td>
            </tr>
        })
    },[games, deleteGame, classes.link, classes.image, classes.firstColumn])

    return <article className={classes.article} id="games">
        <Appear animate show={entered}>
            <Paragraph>List of Games</Paragraph>
            <Words animate>Warning! Clicking on the ✖ deletes the game.</Words>
            <Table animate>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.firstColumn}></th>
                            <th></th>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Category</th>
                            <th style={{width: '200px'}}>Description</th>
                            <th>Author</th>
                            <td>Image Type</td>
                            <th>Duration</th>
                            <th>Is Downloadable</th>
                            <th>Is Streamable</th>
                            <th>Is Premium</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </Table>
        </Appear>
    </article>
}

export default withStyles(styles)(ListGames)