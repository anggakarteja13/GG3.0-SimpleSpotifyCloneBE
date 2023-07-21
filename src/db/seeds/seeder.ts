import { connectDB } from "..";
import { Artist } from "../models/Artist";
import { Song } from "../models/Song";
import { ObjectId } from 'mongodb';

const artistSeeds = [
    {
        _id: new ObjectId().toString(),
        name: 'Artist 1'
    },
    {
        _id: new ObjectId().toString(),
        name: 'Artist 2'
    }
];

const songSeeds = [
    {
        title: 'Song 1',
        artist_ids: [artistSeeds[0]._id, artistSeeds[1]._id],
        url: 'Song URL 1'
    },
    {
        title: 'Song 2',
        artist_ids: [artistSeeds[0]._id],
        url: 'Song URL 2'
    }
];

async function seed() {
    try {
        new connectDB().startDB();
        await Promise.all([Artist.deleteMany(), Song.deleteMany()]);
        const artist = await Artist.create(artistSeeds);
        const song = await Song.create(songSeeds);
        if ((artist.length>0) && (song.length>0)) {
            console.log('Success seeding');
            process.exit(0);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
seed();
