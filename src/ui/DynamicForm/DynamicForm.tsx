'use client'
import { Field } from '@/interfaces/formInterfaces'
import { createFormResponse } from '@/lib/actions/form.actions'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'
import { FormEvent } from 'react'
import { toast } from 'react-toastify'

const DynamicForm = ({ id, data }: { id?: string; data: Field[] }) => {
  const router = useRouter()
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formDataObject: Record<string, any> = {}

    formData.forEach((value, key) => {
      if (formDataObject[key]) {
        if (!Array.isArray(formDataObject[key])) {
          formDataObject[key] = [formDataObject[key].toString()]
        }
        formDataObject[key].push(value.toString())
      } else {
        formDataObject[key] = value.toString()
      }
    })

    const formattedData = data.map((field) => ({
      type: field.type,
      required: field.required,
      label: field.label,
      className: field.className,
      name: field.name,
      value: formDataObject[field.name] || '',
    }))
    if (id) {
      try {
        const response = await createFormResponse(id, formattedData)
        toast.success('Form successfully submitted!', { autoClose: 1000 })
        router.push('/')
      } catch (error) {
        console.error('Error saving form response:', error)
      }
    }
  }

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'select':
        const optionArray =
          typeof field.values === 'object'
            ? field.values
            : Array(1).fill((field as any)?.value)
        console.log(
          'mazid',
          typeof field.values === 'object'
            ? field.values
            : Array(1).fill((field as any)?.value),
        )

        return (
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#cecece"
          >
            {optionArray?.map((option, j) => (
              <option key={j} value={option?.value} selected={option?.selected}>
                {option?.label ?? option?.value}
              </option>
            ))}
          </select>
        )

      case 'checkbox-group':
        return (
          <div className="space-y-2">
            {field.values?.map((option, j) => (
              <div key={j} className="flex items-center">
                <input
                  id={`${field.name}-${option.value}`}
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  defaultChecked={option.selected}
                  className="mr-2"
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className="text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )

      case 'radio-group':
        return (
          <div className="space-y-2">
            {field.values?.map((option, j) => (
              <div key={j} className="flex items-center">
                <input
                  id={`${field.name}-${option.value}`}
                  type="radio"
                  name={field.name}
                  value={option.value}
                  defaultChecked={option.selected}
                  className="mr-2"
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className="text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )

      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            required={field.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#cecece"
            placeholder={field.placeholder}
          >
            {field.value}
          </textarea>
        )

      case 'date':
        return (
          <input
            id={field.name}
            type="date"
            name={field.name}
            value={field.value}
            required={field.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#cecece"
          />
        )

      case 'number':
        return (
          <input
            id={field.name}
            type="number"
            name={field.name}
            required={field.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#cecece"
            min={field.min}
            max={field.max}
            step={field.step}
            value={field.value}
          />
        )

      case 'text':
        return (
          <input
            id={field.name}
            type="text"
            name={field.name}
            value={field.value}
            required={field.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#cecece"
            placeholder={field.placeholder}
          />
        )

      case 'button':
        return (
          <button type="submit" className={`btn ${field.className}`}>
            {field.label}
          </button>
        )

      case 'file':
        return (
          <input
            id={field.name}
            type="file"
            name={field.name}
            required={field.required}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:#cecece"
          />
        )

      case 'header':
        return <h1 className="text-2xl font-bold mb-4">{field.label}</h1>

      case 'paragraph':
        return <p className="text-gray-700 mb-4">{field.label}</p>

      default:
        return null
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg p-2">
      {data?.map((field: Field, index: number) => (
        <div key={index} className="mb-2 border p-2 rounded-md">
          <label htmlFor={field.name} className="block text-sm text-gray-700">
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}
    </form>
  )
}

DynamicForm.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      type: PropTypes.oneOf([
        'select',
        'checkbox-group',
        'radio-group',
        'textarea',
        'date',
        'number',
        'text',
        'button',
        'file',
        'header',
        'paragraph',
      ]).isRequired,
      required: PropTypes.bool,
      placeholder: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          selected: PropTypes.bool,
        }),
      ),
      min: PropTypes.number,
      max: PropTypes.number,
      step: PropTypes.number,
      className: PropTypes.string,
      access: PropTypes.bool,
      subtype: PropTypes.string,
    }),
  ).isRequired,
}

export default DynamicForm
