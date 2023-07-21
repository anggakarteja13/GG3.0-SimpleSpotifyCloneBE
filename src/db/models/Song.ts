import mongoose, { Document, Schema } from "mongoose";

export type SongDocument = Document & {
    title: string,
    artist_ids: [Schema.Types.ObjectId],
    url: string,
    count: number
};

const SongSchema = new Schema<SongDocument>(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        artist_ids: [{
            type: Schema.Types.ObjectId,
            minlength: 1,
            unique: false,
            ref: 'Artist'
        }],
        url: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
        collection: 'songs',
    }
)

export const Song = mongoose.model<SongDocument>('Song', SongSchema);
