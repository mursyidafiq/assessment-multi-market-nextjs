import { InferSchemaType, model, models, Schema } from 'mongoose';

const StepSchema = new Schema(
	{
		icon: String,
		title: String,
		description: String,

		video: String,
	},
	{ _id: false }
);

const HowItWorksSchema = new Schema(
	{
		market: { type: String, required: true, index: true },
		baseOf: { type: String, required: false, index: true },
		steps: [StepSchema],
	},
	{ timestamps: true }
);

HowItWorksSchema.index({ market: 1 }, { unique: true });

export type HowItWorks = InferSchemaType<typeof HowItWorksSchema>;
export default models.HowItWorks || model('HowItWorks', HowItWorksSchema);


