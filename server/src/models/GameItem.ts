interface Image {
    id: string,
    url: string,
    type: number
}


export interface GameItem {
    gameId: string,
    category: string,
    title: string,
    subtitle: string,
    description: string,
    images: Image[],
    tags: string[],
    author: string,
    duration: number,
    isDownloadable: boolean,
    isStreamable: boolean,
    isPremium: boolean
}