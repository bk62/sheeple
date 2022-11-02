import Router from "next/router";
import React from "react";

import { trpc, type RouterTypes } from "../../utils/trpc";
import useZodForm from "../../hooks/useZodForm";
import { AddDaoSchema } from "../../server/trpc/validation_schemas";
import { getSidebarLayout } from "../../components/layouts/sidebar";
import { type NextPageWithLayout } from "../page";


const AddDao: NextPageWithLayout = () => {
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

    return (
        <div>
            <form onSubmit={form.handleSubmit(triggerMutation)}>
                <h1>Add a DAO</h1>
                <div>
                    <label htmlFor="name">DAO Name:</label>
                    <input
                        autoFocus
                        type="text"
                        placeholder="DAO Name"
                        {...form.register("name", { required: true })}
                    />
                    {form.formState.errors.name?.message && (
                        <p>{form.formState.errors.name?.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="description">DAO Description:</label>
                    <textarea
                        rows={8}
                        cols={50}
                        placeholder="Description"
                        {...form.register("description", { required: false })}
                    />
                    {form.formState.errors.description?.message && (
                        <p>{form.formState.errors.description?.message}</p>
                    )}
                </div>

                {mutation.isError ? (
                    <p>An error occurred: {mutation.error.message}</p>
                ) : null}

                {mutation.isSuccess ? (
                    <p>Success!</p>
                ) : null}

                <button disabled={mutation.isLoading} type="submit">
                    {mutation.isLoading ? "Adding..." : "Submit"}
                </button>
                <button onClick={() => Router.push("/daos")}>Cancel</button>
            </form>
        </div>
    )
}

AddDao.getLayout = getSidebarLayout;

export default AddDao;