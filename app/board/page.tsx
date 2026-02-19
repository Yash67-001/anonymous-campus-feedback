import { ClientLayout } from "@/components/client-layout"
import { PublicBoard } from "@/components/public-board"

export default function BoardPage() {
  return (
    <ClientLayout>
      <section className="px-4 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="font-mono text-sm text-primary">PUBLIC BOARD</span>
            <h1 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Campus Feedback Board
            </h1>
            <p className="mt-3 text-muted-foreground">
              All feedback is on-chain and publicly verifiable. Vote with 0-ALGO transactions.
            </p>
          </div>

          {/* Board */}
          <PublicBoard />
        </div>
      </section>
    </ClientLayout>
  )
}
