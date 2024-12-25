import mongoose, { Schema, Document } from "mongoose";

export interface IUniversity extends Document {
	name: string;
	description: string;
	logo: string;
	website: string;
	address: string;
	coordinates: {
		latitude: number;
		longitude: number;
	};
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

const UniversitySchema = new Schema<IUniversity>(
	{
		name: { type: String, required: true },
		description: { type: String, default: "" },
		logo: { type: String, default: "" },
		website: { type: String, default: "" },
		address: { type: String, required: true },
		coordinates: {
			latitude: { type: Number, required: true },
			longitude: { type: Number, required: true },
		},
		status: { type: String, default: "active" },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date },
	},
	{ timestamps: { createdAt: true, updatedAt: true } }
);

const University = mongoose.models.University || mongoose.model<IUniversity>("University", UniversitySchema);
export default University;
