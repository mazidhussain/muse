import mongoose, { Document, Model, Types, Schema } from 'mongoose'

export interface IFormResponse {
  formId: Types.ObjectId
  formResponse: any
  createdAt: Date
  updatedAt: Date
}

export interface IFormResponseDocument extends IFormResponse, Document {
  formId: Types.ObjectId
  formResponse: any
  createdAt: Date
  updatedAt: Date
}

const FormResponseSchema = new Schema<IFormResponseDocument>(
  {
    formId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    formResponse: {
      type: Object,
    },
  },
  { timestamps: true },
)

const FormResponseModel: Model<IFormResponseDocument> =
  mongoose.models.FormResponse ||
  mongoose.model('FormResponse', FormResponseSchema)

export default FormResponseModel
