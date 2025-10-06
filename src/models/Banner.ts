import { InferSchemaType, model, models, Schema } from 'mongoose';

const BannerSchema = new Schema(
	{
		market: { type: String, required: true, index: true },
		baseOf: { type: String, required: false, index: true },
		image: { type: String },
		video: { type: String },
		headline: { type: String },
		button: { label: String, url: String },
	},
	{ timestamps: true }
);

BannerSchema.index({ market: 1 }, { unique: true });

export type Banner = InferSchemaType<typeof BannerSchema>;
export default models.Banner || model('Banner', BannerSchema);


