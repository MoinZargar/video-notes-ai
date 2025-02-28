import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AIChatFormData } from "@/types/forms"
import { aiChatSchema } from "@/lib/schemas/aiChatSchema"
import axios from "axios"
import { ChatMessage } from "@/types/chat"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { XCircle } from "lucide-react"

interface AIChatFormProps { 
    onMessage: (message: ChatMessage) => void
    history: ChatMessage[]
    setIsLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
}

export default function AIChatForm({ onMessage, history, setIsLoading, setError }: AIChatFormProps) {
   
    const form = useForm<AIChatFormData>({
        resolver: zodResolver(aiChatSchema),
        defaultValues: {
            message: "",
        },
    })

    const onSubmit = async(values: AIChatFormData) => {
        setError(null)
        const trimmedMessage = values.message.trim()
        if (!trimmedMessage) return

        try {
            setIsLoading(true) 
            onMessage({ role: 'user', parts: [{ text: trimmedMessage }] })
            form.reset()
            const response = await axios.post("/api/chat", {
                message: trimmedMessage,
                history: history
            })
            if (response.data.response) {
                onMessage({ role: 'model', parts: [{ text: response.data.response }] })
            }

        } catch (error:any) {
            const message=error?.response?.data?.error;
            setError(message? message : "Something went wrong while generating response")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-2">
            {form.formState.errors.message && (
                <Alert variant="destructive" className="py-2">
                    <AlertDescription className="flex items-center text-sm font-medium">
                        <XCircle className="h-4 w-4 mr-2" />
                        {form.formState.errors.message.message}
                    </AlertDescription>
                </Alert>
            )}
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormControl className="flex-grow lg:mr-2 mr-1">
                                <Input
                                    placeholder="Message AI Tutor..."
                                    {...field}
                                    className={form.formState.errors.message ? "border-red-500" : ""}
                                />
                            </FormControl>
                        )}
                    />
                    <Button 
                        type="submit" 
                        size="icon" 
                        disabled={form.formState.isSubmitting}
                    >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </form>
            </Form>
        </div>
    )
}