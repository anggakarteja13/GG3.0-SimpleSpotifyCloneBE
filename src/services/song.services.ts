import { Song, SongDocument } from "../db/models/Song";
import { Artist } from "../db/models/Artist";
import { ObjectId } from "mongodb";

export async function getAllSong(sort: boolean): Promise<SongDocument[] | any> {
    let sortOp = {}
    if (sort)
        sortOp.count = 'desc';
    else
        sortOp.createdAt = 'asc'

    const songs = await Song.find()
        .sort(sortOp)
        .select(['title', 'artist_ids', 'url', 'count', 'createdAt'])
        .populate({path: 'artist_ids', select: 'name', model: Artist});
    return songs;
}

export async function getSongById(id: string): Promise<SongDocument | any> {
    const _id = new ObjectId(id);
    const song = await Song.findOne({_id})
        .select(['title', 'artist_ids', 'url', 'count'])
        .populate({path: 'artist_ids', select: 'name', model: Artist});
    if(song) {
        song.count = song.count + 1;
        song.save();
    }
    return song;
}

export async function addSong(document: SongDocument): Promise<any> {
    const getExistsSong = await Song.findOne({title: document.title});
    if (getExistsSong)
        return false;
    const newSong = await Song.create(document);
    return newSong;
}
