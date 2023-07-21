import { Request, Response } from "express";
import { getPlaylistSong, addSongToPlaylist } from "../services/playlist.services";
import { responseError, responseSuccess } from "../utils/output";

export async function getPlaylist(req: Request, res: Response) {
    try {
        const playlist = await getPlaylistSong();
        return responseSuccess(res, playlist);
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function addSong(req: Request, res: Response): Promise<any> {
    try {
        const id = req.body.song_id;
        const newSong = await addSongToPlaylist(id);
        if(!newSong)
            return responseError(res, 404, 'Song not exists')
        return responseSuccess(res, newSong);
    } catch (error) {
        return responseError(res, 500, error);
    }
}
