import mongoose, { Document, Model } from 'mongoose'
import { Field } from '@/interfaces/formInterfaces'

export interface IForm {
  name: string
  description: string
  formData: Field[]
  createdAt: Date
  updatedAt: Date
}

export interface IFormDocument extends IForm, Document {
  name: string
  description: string
  formData: any
  createdAt: Date
  updatedAt: Date
}

const FormSchema = new mongoose.Schema<IFormDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    formData: {
      type: Object,
    },
  },
  { timestamps: true },
)

const FormModel: Model<IFormDocument> =
  mongoose.models.Form || mongoose.model('Form', FormSchema)

export default FormModel
