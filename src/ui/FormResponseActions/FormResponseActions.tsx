'use client'

import useModal from '@/hooks/useModal'
import { Field } from '@/interfaces/formInterfaces'
import DynamicForm from '../DynamicForm/DynamicForm'

const previewModal = (formData: Field[]) => {
  return (
    <div className="modal-wrapper">
      <DynamicForm data={formData} />
    </div>
  )
}

const FormResponseActions = ({
  formId,
  formData,
}: {
  formId: string
  formData: any
}) => {
  const [modal, showModal] = useModal()
  const handlePreview = () => {
    showModal({
      title: 'User Response',
      contentFn: (onClose) => previewModal(formData),
      closeOnClickOutside: true,
      size: 'md',
      showCloseButton: true,
    })
  }
  console.log('formData', formData)
  return (
    <div className="flex items-center">
      <button
        onClick={handlePreview}
        title="See form response"
        className="text-blue-500 hover:text-blue-700"
      >
        <svg
          width={20}
          height={20}
          enableBackground="new 0 0 32 32"
          id="Editable-line"
          version="1.1"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="  M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z"
            fill="none"
            id="XMLID_10_"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            stroke-width="2"
          />
          <circle
            cx="16"
            cy="16"
            fill="none"
            id="XMLID_12_"
            r="5"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
      </button>
      <button
        title="Delete Response"
        className="text-red-500 hover:text-red-700 ml-3"
      >
        <svg
          enable-background="new 0 0 512 512"
          width={20}
          height={20}
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z"
              fill="#37404D"
            />
            <rect
              fill="#37404D"
              height="317.885"
              width="19.868"
              x="246.173"
              y="126.511"
            />
            <polygon
              fill="#37404D"
              points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "
            />
            <polygon
              fill="#37404D"
              points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "
            />
          </g>
        </svg>
      </button>
      {modal}
    </div>
  )
}

export default FormResponseActions
