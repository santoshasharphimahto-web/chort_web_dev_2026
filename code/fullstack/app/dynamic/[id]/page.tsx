import { Suspense } from 'react'

type PageProps = {
  params: Promise<{ id: string }>
}

async function DynamicPageContent({ params }: PageProps) {
  const { id } = await params;
  return (
    <div>
      <div>dynamic page for {id}</div>
    </div>
  )
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <DynamicPageContent params={params} />
    </Suspense>
  )
}
