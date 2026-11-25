import { Suspense } from 'react'

type PageProps = {
  params: Promise<{ id: string; categories: string }>
}

async function CategoryPageContent({ params }: PageProps) {
  const { id, categories } = await params

  return (
    <div>
      dynamic category page for {id}: {categories}
    </div>
  )
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <CategoryPageContent params={params} />
    </Suspense>
  )
}
