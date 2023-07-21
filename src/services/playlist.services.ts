import { Playlist, PlaylistDocument } from "../db/models/Playlist";
import { Song } from "../db/models/Song";
import { ObjectId } from "mongodb";

export async function getPlaylistSong(): Promise<PlaylistDocument[]|any> {
    const playlist = await Playlist.find()
        .select(['song_id'])
        .populate({path: 'song_id', select: 'title', model: Song});
    return playlist;
}

export async function addSongToPlaylist(id: string): Promise<PlaylistDocument|boolean|any> {
    const _id = new ObjectId(id);
    const getExistsSong = await Song.findById({_id});
    if (!getExistsSong)
        return false;
    const newSongInPlaylist = await Playlist.findOneAndUpdate({song_id: _id}, {upsert: true});
    return newSongInPlaylist;
}
