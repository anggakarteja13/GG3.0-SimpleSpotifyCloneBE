import { getSongList, addNewSong, getSong } from "../controller/song.controller";
import { getPlaylist, addSong } from "../controller/playlist.controller";
import express from "express";
const router = express.Router({
  caseSensitive: true,
  strict: true
});

router.get('/api/songs', getSongList);
router.get('/api/songs/:id', getSong);
router.post('/api/songs', addNewSong);

router.get('/api/playlists', getPlaylist);
router.post('/api/playlists', addSong);

export default router;
