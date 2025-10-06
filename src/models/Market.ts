import { InferSchemaType, model, models, Schema } from 'mongoose';


const MarketSchema = new Schema(
	{
		code: { type: String, required: true, unique: true },
		name: { type: String, required: true },

		headerFrom: { type: String },
		footerFrom: { type: String },
		bannerFrom: { type: String },
		howItWorksFrom: { type: String },
	},
	{ timestamps: true }
);

export type Market = InferSchemaType<typeof MarketSchema>;
export default models.Market || model('Market', MarketSchema);


