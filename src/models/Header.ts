import { InferSchemaType, model, models, Schema } from 'mongoose';

const HeaderSchema = new Schema(
	{
		market: { type: String, required: true, index: true },
		baseOf: { type: String, required: false, index: true },
        logo: { type: String, required: false },

        menuItems: [{ type: Schema.Types.Mixed }],
		cta: {
			label: { type: String },
			url: { type: String },
		},
	},
	{ timestamps: true }
);

HeaderSchema.index({ market: 1 }, { unique: true });

export type Header = InferSchemaType<typeof HeaderSchema>;
export default models.Header || model('Header', HeaderSchema);


