import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { trpc, type RouterTypes } from "../../utils/trpc";
import useZodForm from "../../hooks/useZodForm";
import { AddDaoSchema } from "../../server/trpc/validation_schemas";

import { getSidebarLayout } from "../../components/layouts/sidebar";
import { type NextPageWithLayout } from "../page";

import Button from "../../components/controls/buttons";
import { Input, Textarea, FormError } from "../../components/controls/input";
import Protected from "../../components/access/protected";


const AddDao: NextPageWithLayout = () => {
    const { data: session, status: sessionStatus } = useSession();

    const mutation = trpc.dao.add.useMutation();
    const form = useZodForm({
        schema: AddDaoSchema,
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const triggerMutation = async (values: RouterTypes["dao"]["add"]["input"]) => {
        await mutation.mutateAsync(values);
        form.reset();
    }

    if (sessionStatus === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return <Protected />
    }

    return (
        <>
            {/* // <div className="h-full border border-red-500 px-2 lg:px-4 py-10 pt-0"> */}
            <h1 className="text-blue-500 text-2xl font-bold tracking-wide my-2">
                Create a DAO
            </h1>
            <div className="text-gray-400 mb-8 text-xs">
                Please fill out the following form to create a DAO
            </div>
            <form onSubmit={form.handleSubmit(triggerMutation)}>
                <fieldset className="mb-6">
                    <label
                        className="block text-gray-400 text-sm uppercase tracking-wide pb-1 pr-2"
                        htmlFor="name"
                    >
                        Name:
                    </label>
                    <div className="flex-auto">
                        <Input
                            autoFocus
                            type="text"
                            placeholder="My First DAO"
                            className="w-full"
                            errorMessage={form.formState.errors.name?.message}
                            {...form.register("name", { required: true })}
                        />
                    </div>
                </fieldset>

                <fieldset className="w-full mb-6">
                    <label
                        className=" text-gray-400 text-sm uppercase tracking-wide pb-2 pr-2 mb-2"
                        htmlFor="description"
                    >
                        Description:
                    </label>
                    <Textarea
                        rows={8}
                        cols={50}
                        placeholder="All kinds of shennanigans"
                        className="w-full"
                        errorMessage={form.formState.errors.description?.message}
                        {...form.register("description", { required: false })}
                    />
                </fieldset>

                <div className="mt-8 ml-2">

                    {mutation.isError && (
                        <FormError errorMessage={`An error occurred: ${mutation.error.message}`} />
                    )}

                    {mutation.isSuccess ? (
                        <p className="text-sm text-green-700">Success!</p>
                    ) : null}

                    <Button
                        className="mr-4 mb-1"
                        variant="primary"
                        type="submit"
                        loading={mutation.isLoading}
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? "Creating..." : "Create DAO"}
                    </Button>
                    <Button type="button">
                        Cancel
                    </Button>

                </div>
            </form>
            {/* // </div> */}
        </>
    )
}

AddDao.getLayout = getSidebarLayout;

export default AddDao;