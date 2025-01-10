import { Schema, model } from "mongoose";
import { PackageI } from "../interfaces/Package.interfaces";

const PackageSchema = new Schema<PackageI>(
  {
    trackingID: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    tracking: {
      require: true,
      type: {
        currentLocation: {
          type: String,
          required: true,
          trim: true,
        },
        lastUpdate: {
          type: Date,
          require: true,
          default: Date.now,
        },
        currentStatus: {
          type: String,
          required: true,
          trim: true,
        },
        history: [
          {
            location: {
              type: String,
              required: true,
              trim: true,
            },
            timestamp: {
              type: Date,
              require: true,
              default: Date.now,
            },
            status: {
              type: String,
              required: true,
              trim: true,
            },
          },
        ],
      }
    },
    receiver: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model<PackageI>("Package", PackageSchema);
