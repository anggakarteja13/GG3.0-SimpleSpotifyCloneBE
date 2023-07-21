import mongoose, { Document, Schema } from "mongoose";

export type PlaylistDocument = Document & {
    song_id: Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
};

const PlaylistSchema = new Schema<PlaylistDocument>(
    {
        song_id: {
            type: Schema.Types.ObjectId,
            unique: true,
            required: true,
            ref: 'Song'
        }
    },
    {
        timestamps: true,
        collection: 'playlists',
    }
)

export const Playlist = mongoose.model<PlaylistDocument>('Playlist', PlaylistSchema);
