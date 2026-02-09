import mongoose, { Schema, Document } from 'mongoose';

export interface IMusic extends Document {
  title: string;
  artist: string;
  album?: string;
  duration: number;
  genre?: string;
  fileUrl: string;
  createdAt: Date;
}

const MusicSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    index: true
  },
  artist: {
    type: String,
    required: [true, 'Artist is required'],
    trim: true,
    index: true
  },
  album: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    trim: true
  },
  fileUrl: {
    type: String,
    required: true,
    unique: true
  }
}, {

  timestamps: { createdAt: true, updatedAt: false }
});

export default mongoose.model<IMusic>('Music', MusicSchema);