import React from "react";
import Router, { useRouter } from "next/router";

import { trpc, type RouterTypes } from "../../utils/trpc";
import useZodForm from "../../hooks/useZodForm";
import { CreateProposalSchema } from "../../server/trpc/validation_schemas";


const CreateProposalForm: React.FC = () => {
    const router = useRouter();
    const { daoId } = router.query;
    const hasDaoId = React.useMemo(() => !!daoId, [daoId]);

    const mutation = trpc.proposal.create.useMutation();
    const form = useZodForm({
        schema: CreateProposalSchema,
        defaultValues: {
            daoId: "", // daoId as string, - passing value doesn't help, see triggerMutations  - TODO look intos
            title: "",
            body: ""
        }
    });

    const triggerMutation = async (data: RouterTypes["proposal"]["create"]["input"]) => {
        if (hasDaoId) {
            data.daoId = daoId as string;
        }
        else {
            data.daoId = "";
        }
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
            <button onClick={() => Router.push("/daos")}>Cancel</button>
        </form>
    );
}

export default CreateProposalForm;