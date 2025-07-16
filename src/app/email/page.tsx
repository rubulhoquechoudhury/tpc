import PageHeader from "@/components/page-header"
import { EmailForm } from "./email-form"

export default function EmailPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="AI Email Assistant"
        description="Generate personalized email drafts with ease. Provide an existing message and personalization details to get started."
      />
      <div className="max-w-4xl mx-auto w-full">
        <EmailForm />
      </div>
    </div>
  )
}
