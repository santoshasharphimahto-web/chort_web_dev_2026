import { Suspense } from 'react'

type PageProps = {
  params: Promise<{ id: string; categories: string; sluges: string }>
}

async function DynamicCategoryPageContent({ params }: PageProps) {
  const { id, categories, sluges } = await params;
  return (
    <div>
      sluh hai bhiii {id},{categories},{sluges}
    </div>
  )
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <DynamicCategoryPageContent params={params} />
    </Suspense>
  )
}
