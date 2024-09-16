import { getFormById } from '@/lib/actions/form.actions'
import DynamicForm from '@/ui/DynamicForm/DynamicForm'

const Page = async ({
  params,
}: {
  params: {
    user: string
  }
}) => {
  const { user } = params
  const formData = await getFormById(user[1])

  return (
    <div className="w-full flex justify-center items-center">
      <DynamicForm id={user[1]} data={JSON.parse(formData)?.formData} />
    </div>
  )
}

export default Page
