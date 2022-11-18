import React from "react";
import Link from "next/link";
import type { GetServerSideProps } from "next";

import type { WithGetLayout } from "../page";
import { trpc, type RouterTypes } from "../../utils/trpc";
import useZodForm from "../../hooks/useZodForm";
import { CreateProposalSchema } from "../../server/trpc/validation_schemas";
import { getSidebarLayout } from "../../components/layouts/sidebar";


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { daoId } = query;
    return {
        props: {
            daoId
        }
    };

}

const CreateProposalForm: React.FC<{ daoId: string }> & WithGetLayout = ({ daoId }) => {

    const mutation = trpc.proposal.create.useMutation();
    const form = useZodForm({
        schema: CreateProposalSchema,
        defaultValues: {
            daoId: daoId,
            title: "",
            body: ""
        }
    });

    const triggerMutation = async (data: RouterTypes["proposal"]["create"]["input"]) => {
        await mutation.mutateAsync(data);
        form.reset();
    }

    return (
        <form onSubmit={form.handleSubmit(triggerMutation)}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    autoFocus
                    type="text"
                    placeholder="Proposal title"
                    {...form.register("title", { required: false })}
                />
                {form.formState.errors.title?.message && (
                    <p>{form.formState.errors.title?.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="body">Body</label>
                <textarea
                    rows={8}
                    cols={50}
                    placeholder="Proposal body"
                    {...form.register("body", { required: false })}
                />
                {form.formState.errors.body?.message && (
                    <p>{form.formState.errors.body?.message}</p>
                )}
            </div>


            <input type="hidden" {...form.register("daoId")} />

            {form.formState.errors.daoId?.message && (
                <p>DAO ID associated with this proposal: {form.formState.errors.daoId?.message}</p>
            )}

            {mutation.isError ? (
                <p>An error occurred: {mutation.error.message}</p>
            ) : null}

            {mutation.isSuccess ? (
                <p>Success!</p>
            ) : null}

            <button disabled={mutation.isLoading} type="submit">
                {mutation.isLoading ? "Creating..." : "Submit"}
            </button>

            <Link href={`/daos/${encodeURIComponent(daoId)}`}>Back to DAO</Link>

        </form>
    );
}

CreateProposalForm.getLayout = getSidebarLayout

export default CreateProposalForm;