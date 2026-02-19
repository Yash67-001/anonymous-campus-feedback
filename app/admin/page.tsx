import { ClientLayout } from "@/components/client-layout"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  return (
    <ClientLayout>
      <section className="px-4 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="font-mono text-sm text-accent">ADMIN DASHBOARD</span>
            <h1 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Feedback Management
            </h1>
            <p className="mt-3 text-muted-foreground">
              Review, manage, and track the status of all campus feedback submissions.
            </p>
          </div>

          {/* Dashboard */}
          <AdminDashboard />
        </div>
      </section>
    </ClientLayout>
  )
}
