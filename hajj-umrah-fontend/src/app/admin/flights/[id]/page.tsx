import { redirect } from 'next/navigation'

export default async function AdminFlightDetailRedirect({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/admin/flights/${id}/edit`)
}
