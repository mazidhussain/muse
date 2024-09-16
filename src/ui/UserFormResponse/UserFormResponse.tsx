'use client'
import React, { useEffect } from 'react'

const UserFormResponse = ({ formId }: { formId: string }) => {
  useEffect(() => {
    console.log('formId', formId)
  }, [formId])
  return <div>UserFormResponse</div>
}

export default UserFormResponse
