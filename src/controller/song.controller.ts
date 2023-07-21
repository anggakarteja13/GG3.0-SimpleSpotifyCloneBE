import { Request, Response } from "express";
import { SongDocument } from "../db/models/Song";
import { getAllSong, addSong, getSongById } from "../services/song.services";
import { responseError, responseSuccess } from "../utils/output";

export async function getSongList(req: Request, res: Response) {
    try {
        let sort = (req.query.sort) ? true: false;
        const result = await getAllSong(sort);
        return responseSuccess(res, result);
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function getSong(req: Request, res: Response) {
    try {
        const result = await getSongById(req.params.id);
        return responseSuccess(res, result);
    } catch (error) {
        return responseError(res, 500, error);
    }
}

export async function addNewSong(req: Request, res: Response) {
    try {
        const createSong: SongDocument = {
            title: req.body.title,
            artist_ids: req.body.artist_ids,
            url: req.body.url
        }
        const result = await addSong(createSong);
        if(!result)
            return responseError(res, 403, 'Song already exists');
        return responseSuccess(res, result);
    } catch (error) {
        return responseError(res, 500, error);
    }
}