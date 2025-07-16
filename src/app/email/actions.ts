"use server"

import { generateEmailDraft } from "@/ai/flows/generate-email-draft"
import { z } from "zod"

const EmailSchema = z.object({
  existingMessage: z.string().min(10, "Existing message is too short."),
  personalizationDetails: z
    .string()
    .min(5, "Personalization details are too short."),
})

export type FormState = {
  success: boolean
  message: string
  draft?: string
}

export async function generateDraftAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = EmailSchema.safeParse({
    existingMessage: formData.get("existingMessage"),
    personalizationDetails: formData.get("personalizationDetails"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      draft: "",
    }
  }

  try {
    const result = await generateEmailDraft(validatedFields.data)
    if (result.draft) {
      return {
        success: true,
        message: "Draft generated successfully.",
        draft: result.draft,
      }
    } else {
      return { success: false, message: "Failed to generate draft.", draft: "" }
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: "An unexpected error occurred.",
      draft: "",
    }
  }
}
