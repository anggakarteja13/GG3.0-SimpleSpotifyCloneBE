import mongoose, { Document, Schema } from "mongoose";

export type ArtistDocument = Document & {
    name: string,
    createdAt: Date,
    updatedAt: Date
};

const ArtistSchema = new Schema<ArtistDocument>(
    {
        name: {
            type: String,
            unique: true,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'artists',
    }
)

export const Artist = mongoose.model<ArtistDocument>('Artist', ArtistSchema);
