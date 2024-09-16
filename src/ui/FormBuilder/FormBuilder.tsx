'use client'
import $ from 'jquery'
import React, { useEffect } from 'react'
import './style.css'
import { Field } from '@/interfaces/formInterfaces'

const formStyles = {
  border: '2px solid #6F923E',
  padding: '10px',
  borderRadius: '4px',
  backgroundColor: '#f5f5f5',
}

const FormBuilder = ({
  setFormData = () => {},
  fields = [],
}: {
  setFormData?: (_val: Field[]) => void
  fields?: Field[]
}) => {
  useEffect(() => {
    const formElement = document.getElementById('form-builder')
    if (formElement) {
      ;(window as any).jQuery = $
      ;(window as any).$ = $
      require('jquery-ui-sortable')
      require('formBuilder')
      const form = ($(formElement) as any).formBuilder({
        formData: fields,
        showActionButtons: false,
        controlOrder: ['text', 'textarea', 'number', 'date', 'button'],
      })
      setFormData(form)
    }
  }, [])

  return (
    <div
      id="form-builder"
      style={formStyles}
      className="w-[80%] bg-[url(/paper.svg)]"
    />
  )
}
export default FormBuilder
