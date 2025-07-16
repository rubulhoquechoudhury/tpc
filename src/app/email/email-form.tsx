"use client"

import * as React from "react"
import { useFormState, useFormStatus } from "react-dom"
import { Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { generateDraftAction } from "./actions"

const initialState = {
  success: false,
  message: "",
  draft: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      style={{
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--accent-foreground))",
      }}
    >
      {pending ? "Generating..." : <><Wand2 className="mr-2 h-4 w-4" /> Generate Draft</>}
    </Button>
  )
}

export function EmailForm() {
  const [state, formAction] = useFormState(generateDraftAction, initialState)
  const { toast } = useToast()
  const [draft, setDraft] = React.useState("")

  React.useEffect(() => {
    if (state.message) {
      if (state.success) {
        setDraft(state.draft || "")
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: state.message,
        })
      }
    }
  }, [state, toast])

  return (
    <form action={formAction}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="existingMessage">Existing Message</Label>
              <Textarea
                id="existingMessage"
                name="existingMessage"
                placeholder="Paste your base email template here..."
                rows={8}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="personalizationDetails">
                Personalization Details
              </Label>
              <Textarea
                id="personalizationDetails"
                name="personalizationDetails"
                placeholder="e.g., Recipient: John Doe, Company: Acme Inc, Position: Software Engineer"
                rows={4}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="draft"
              name="draft"
              placeholder="Your personalized email draft will appear here..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={14}
              className="bg-muted"
            />
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
