interface Image {
    id: string,
    url: string,
    type: number
}


export interface GameItem {
    category: string,
    title: string,
    subtitle: string,
    description: string,
    images: Image[],
    type: number,
    tags: string[],
    author: string,
    replayBundleUrlJson: string,
    duration: number,
    isDownloadable: boolean,
    isStreamable: boolean,
    version: string,
    isPremium: boolean
}