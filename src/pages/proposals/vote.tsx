import React from "react";
import Link from "next/link";
import type { GetServerSideProps } from "next";

import type { WithGetLayout } from "../page";
import { trpc, type RouterTypes } from "../../utils/trpc";
import useZodForm from "../../hooks/useZodForm";
import { VoteSchema } from "../../server/trpc/validation_schemas";
import { getSidebarLayout } from "../../components/layouts/sidebar";


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { daoId, proposalId } = query;
    return {
        props: {
            daoId,
            proposalId
        }
    };

}

const VoteOnProposal: React.FC<{ daoId: string, proposalId: string }> & WithGetLayout = ({ daoId, proposalId }) => {
    const mutation = trpc.vote.vote.useMutation();
    const form = useZodForm({
        schema: VoteSchema,
        defaultValues: {
            daoId: daoId,
            proposalId: proposalId,
            choice: "",
            reason: "",
        }
    });

    const triggerMutation = async (values: RouterTypes["vote"]["vote"]["input"]) => {
        await mutation.mutateAsync(values);
        form.reset();
    }

    return (
        <div>
            <form onSubmit={form.handleSubmit(triggerMutation)}>
                <h1>Vote on Proposal</h1>
                <div>
                    <label htmlFor="choice">Choice:</label>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Choice"
                        {...form.register("choice", { required: true })}
                    />
                    {form.formState.errors.choice?.message && (
                        <p>{form.formState.errors.choice?.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="reason">Reason:</label>
                    <textarea
                        rows={8}
                        cols={50}
                        placeholder="Reason"
                        {...form.register("reason", { required: false })}
                    />
                    {form.formState.errors.reason?.message && (
                        <p>{form.formState.errors.reason?.message}</p>
                    )}
                </div>

                <input type="hidden" {...form.register("daoId")} />
                {form.formState.errors.daoId?.message && (
                    <p>DAO ID associated with this vote: {form.formState.errors.daoId?.message}</p>
                )}

                <input type="hidden" {...form.register("proposalId")} />
                {form.formState.errors.proposalId?.message && (
                    <p>Proposal ID associated with this vote: {form.formState.errors.proposalId?.message}</p>
                )}
                {form.formState.errors.voterId?.message && (
                    <p>Voter User ID associated with this proposal: {form.formState.errors.voterId?.message}</p>
                )}

                {mutation.isError ? (
                    <p>An error occurred: {mutation.error.message}</p>
                ) : null}

                {mutation.isSuccess ? (
                    <p>Success!</p>
                ) : null}

                <button disabled={mutation.isLoading} type="submit">
                    {mutation.isLoading ? "Adding..." : "Submit"}
                </button>

                <Link href={`/daos/${encodeURIComponent(daoId)}/vote`}>Back to DAO</Link>
                <Link href={`/proposals/${encodeURIComponent(proposalId)}/vote`}>Back to proposal</Link>
            </form>
        </div>
    )
}

VoteOnProposal.getLayout = getSidebarLayout;

export default VoteOnProposal;