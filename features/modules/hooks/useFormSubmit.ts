import { useCallback } from "react"
import { toast } from "sonner"
import { ZodError, type ZodSchema } from "zod"

type FormErrors<T> = Partial<Record<keyof T, string>>

/** Generic form submit handler with Zod validation and toast feedback. */
export function useFormSubmit<T extends Record<string, number>>(
  schema: ZodSchema<T>,
  form: Partial<Record<keyof T, string>>,
  setErrors: (e: FormErrors<T>) => void,
  setChecked: (v: boolean) => void,
  successMsg: string,
  errorMsg: string,
) {
  return useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const cleaned = Object.fromEntries(
          Object.entries(form).map(([k, v]) => [k, v === "" ? undefined : Number(v)]),
        )
        schema.parse(cleaned)
        setErrors({})
        setChecked(true)
        toast.success(successMsg)
      } catch (err) {
        if (err instanceof ZodError) {
          const fieldErrors: FormErrors<T> = {}
          err.issues.forEach((issue) => {
            if (issue.path[0]) {
              fieldErrors[issue.path[0] as keyof T] = issue.message
            }
          })
          setErrors(fieldErrors)
          toast.error(errorMsg)
        }
      }
    },
    [schema, form, setErrors, setChecked, successMsg, errorMsg],
  )
}
