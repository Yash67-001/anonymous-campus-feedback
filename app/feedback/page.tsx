import { ClientLayout } from "@/components/client-layout"
import { FeedbackForm } from "@/components/feedback-form"

export default function FeedbackPage() {
  return (
    <ClientLayout>
      <section className="px-4 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="font-mono text-sm text-primary">SUBMIT FEEDBACK</span>
            <h1 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Share Your Voice Anonymously
            </h1>
            <p className="mt-3 text-muted-foreground">
              Your wallet verifies eligibility. Your identity stays private.
            </p>
          </div>

          {/* Form */}
          <FeedbackForm />
        </div>
      </section>
    </ClientLayout>
  )
}
