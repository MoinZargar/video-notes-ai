"use client"
import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,

    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCourseSchema } from "@/lib/schemas/createCourseSchema";
import ErrorMessage from "@/components/ErrorMessage";
import { createCourse } from "@/app/actions/createCourseAction";
import LoadingButton from "@/components/LoadingButton";
import { Course } from "@prisma/client";

interface CreateCourseFormProps {
    onSuccess: (course:Course) => void;
}

export default function CreateCourseForm({ onSuccess }: CreateCourseFormProps) {
    const [globalError, setGlobalError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const form = useForm<z.infer<typeof createCourseSchema>>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof createCourseSchema>) => {
        try {
            setGlobalError("");
            setSuccessMessage("");
            const response = await createCourse({
                ...values,
                name: values.name.toLowerCase(),
                description: values.description?.toLowerCase()
            });
            if(response.success && response.course){
                setSuccessMessage(response.success);
                form.reset();
                onSuccess(response.course);
            }
            else{
                setGlobalError(response.error || "Something went wrong");
            }
        } catch (error:any) {
            setGlobalError(error?.message);
        }
    };

    return (
        <div>
            {globalError && <ErrorMessage error={globalError} />}
            {successMessage && (
                <div className="mb-4 p-2 text-green-700 rounded">
                    {successMessage}
                </div>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel>Course Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter course name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel>Description (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter course description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <LoadingButton
                            pending={form.formState.isSubmitting}
                        >
                            Add Course
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </div>
    );
}