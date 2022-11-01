import Router from "next/router";
import React from "react";

import { trpc, type RouterTypes } from "../../utils/trpc";
import useZodForm from "../../hooks/useZodForm";
import { VoteSchema } from "../../server/trpc/validation_schemas";


const VoteOnProposal: React.FC = () => {
    const mutation = trpc.vote.vote.useMutation();
    const form = useZodForm({
        schema: VoteSchema,
        defaultValues: {
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

                {form.formState.errors.daoId?.message && (
                    <p>DAO ID associated with this vote: {form.formState.errors.daoId?.message}</p>
                )}
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
                <button onClick={() => Router.push("/daos")}>Cancel</button>
            </form>
        </div>
    )
}

export default VoteOnProposal;