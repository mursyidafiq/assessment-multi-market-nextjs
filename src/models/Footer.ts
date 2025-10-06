import { InferSchemaType, model, models, Schema } from 'mongoose';

const FooterSchema = new Schema(
	{
		market: { type: String, required: true, index: true },
		baseOf: { type: String, required: false, index: true },
		links: [{ label: String, url: String }],
		social: [{ platform: String, url: String }],
		contact: {
			email: String,
			phone: String,
			address: String,
		},
	},
	{ timestamps: true }
);

FooterSchema.index({ market: 1 }, { unique: true });

export type Footer = InferSchemaType<typeof FooterSchema>;
export default models.Footer || model('Footer', FooterSchema);


