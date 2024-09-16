interface FieldOption {
  value: string
  label: string
  selected?: boolean
}

interface FieldBase {
  type: string
  name: string
  required?: boolean
  placeholder?: string
  className?: string
  label?: string
}

interface FieldSelect extends FieldBase {
  type: 'select'
  values?: FieldOption[]
}

interface FieldCheckboxGroup extends FieldBase {
  type: 'checkbox-group'
  values?: FieldOption[]
}

interface FieldRadioGroup extends FieldBase {
  type: 'radio-group'
  values?: FieldOption[]
}

interface FieldTextarea extends FieldBase {
  type: 'textarea'
  value: string
}

interface FieldDate extends FieldBase {
  type: 'date'
  value: string
}

interface FieldNumber extends FieldBase {
  value: string
  type: 'number'
  min?: number
  max?: number
  step?: number
}

interface FieldText extends FieldBase {
  type: 'text'
  value: string
}

interface FieldButton extends FieldBase {
  type: 'button'
  label: string
}

interface FieldFile extends FieldBase {
  type: 'file'
}

interface FieldHeader extends FieldBase {
  type: 'header'
}

interface FieldParagraph extends FieldBase {
  type: 'paragraph'
}

export interface formInterface {
  _id: string
  name: string
  formData: Object[]
  description: string
}

export type Field =
  | FieldSelect
  | FieldCheckboxGroup
  | FieldRadioGroup
  | FieldTextarea
  | FieldDate
  | FieldNumber
  | FieldText
  | FieldButton
  | FieldFile
  | FieldHeader
  | FieldParagraph
