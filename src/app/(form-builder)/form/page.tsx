import { formInterface } from '@/interfaces/formInterfaces'
import { getForms } from '@/lib/actions/form.actions'
import CreateFormBtn from '@/ui/CreateFormBtn/CreateFormBtn'
import FormCard from '@/ui/FormCard/FormCard'
import React from 'react'

async function Page() {
  const formListJson = await getForms()
  const formList: formInterface[] = JSON.parse(formListJson)

  return (
    <div className="w-[100%]">
      <CreateFormBtn />
      <div className="border-b border-t p-5 border-[#e5e7eb]">
        <h2 className="text-2xl font-bold">Your forms</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-10">
        {formList?.map((form: formInterface, index: number) => {
          return <FormCard key={form._id} form={form} />
        })}
      </div>
      {formList && formList.length == 0 && (
        <div className="flex items-center justify-center w-full h-[200px] font-bold text-lg">
          No form found
        </div>
      )}
    </div>
  )
}

export default Page
