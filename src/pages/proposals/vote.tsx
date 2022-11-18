import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import { useQuery, useMutation } from "@tanstack/react-query";
import { Dialog, Transition } from '@headlessui/react'

import { trpc, type RouterTypes } from "../../utils/trpc";
import useZodForm from "../../hooks/useZodForm";
import { VoteSchema } from "../../server/trpc/validation_schemas";

import type { WithGetLayout } from "../page";
import { getSidebarLayout } from "../../components/layouts/sidebar";

import Button from "../../components/controls/buttons";
import { Input, Textarea, FormError } from "../../components/controls/input";
import Protected from "../../components/access/protected";


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
    const { data: session, status: sessionStatus } = useSession();

    // Get choices values
    const { data: proposal } = trpc.proposal.get.useQuery({ id: proposalId });
    let choices: string[] = [];
    if (proposal && proposal.choices && typeof proposal.choices === "object" && "choices" in proposal.choices) {
        choices = proposal.choices.choices as string[] || [];
    }


    const mutation = trpc.vote.vote.useMutation({
        // open modal linking to created item's page on success
        onSuccess: (data, variables, context) => {
            // if (data.id) {
            //     setCreatedId(data.id);
            // }
            openModal();
        }
    });
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

    // Success modal
    const [isOpen, setIsOpen] = useState(false);
    // const [createdId, setCreatedId] = useState('')
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);


    if (sessionStatus === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return <Protected />
    }

    return (
        <>
            <h1 className="form-title">
                Vote on Proposal
            </h1>
            <div className="form-subtitle">
                Please fill out the following form to vote on this proposal
            </div>
            {/* <p>
                {JSON.stringify(form.formState.errors)}
            </p> */}
            <form onSubmit={form.handleSubmit(triggerMutation)}>

                {/* <fieldset className="w-full mb-6">
                    <label className="form-label" htmlFor="choice">Choice:</label>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Choice"
                        {...form.register("choice", { required: true })}
                    />
                    {form.formState.errors.choice?.message && (
                        <p>{form.formState.errors.choice?.message}</p>
                    )}
                </fieldset> */}

                <fieldset className="w-full mb-6">
                    <label className="form-label" htmlFor="choice">Choice:</label>
                    <div className="flex flex-col md:flex-row">
                        {choices && (
                            choices.map(
                                (choice, ix) => (
                                    <div key={ix} className="flex flex-auto items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
                                        <input
                                            {...form.register("choice", { required: true })}
                                            id={`choice-radio-${ix}`}
                                            type="radio"
                                            value={choice}
                                            // name="choice"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor={`choice-radio-${ix}`} className="py-4 ml-2 text-sm capitalize font-medium text-gray-400">
                                            {choice}
                                        </label>
                                    </div>
                                )
                            )
                        )}
                    </div>
                    {form.formState.errors.choice?.message && (
                        <FormError
                            errorMessage={form.formState.errors.choice?.message}
                        />
                    )}
                </fieldset>

                <fieldset className={"w-full mb-6"}>
                    <label className="form-label" htmlFor="reason">Reason:</label>
                    <Textarea
                        rows={8}
                        cols={50}
                        placeholder="My Reason"
                        errorMessage={form.formState.errors.reason?.message}
                        {...form.register("reason", { required: false })}
                    />
                </fieldset>

                <fieldset className={`w-full ${form.formState.errors.daoId?.message && "mb-6"}`}>
                    <input type="hidden" {...form.register("daoId")} />
                    {form.formState.errors.daoId?.message && (
                        <FormError errorMessage={`DAO ID associated with this vote: ${form.formState.errors.daoId?.message}`} />
                    )}
                </fieldset>

                <fieldset className={`w-full ${form.formState.errors.proposalId?.message && "mb-6"}`}>
                    <input type="hidden" {...form.register("proposalId")} />
                    {form.formState.errors.proposalId?.message && (
                        <FormError errorMessage={`Proposal ID associated with this vote: ${form.formState.errors.proposalId?.message}`} />
                    )}
                </fieldset>

                <div className="mt-8 ml-2">

                    {mutation.isError && (
                        <FormError errorMessage={`An error occurred: ${mutation.error.message}`} />
                    )}

                    {mutation.isSuccess ? (
                        <p className="text-xl text-green-600 ">Success!</p>
                    ) : null}


                    <Button
                        className="mr-4 mb-1"
                        variant="primary"
                        type="submit"
                        loading={mutation.isLoading}
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? "Voting..." : "Vote"}
                    </Button>

                    <Link href={`/daos/${encodeURIComponent(daoId)}/vote`}>
                        <Button
                            type="button"
                            className="mr-4 mb-1"
                        >
                            Back to DAO
                        </Button>
                    </Link>
                    <Link href={`/proposals/${encodeURIComponent(proposalId)}/vote`}>
                        <Button
                            type="button"
                        >
                            Back to Proposal
                        </Button>
                    </Link>
                </div>
            </form>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Vote Stored
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Your vote has been successfully stored.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <Link href={`/proposals/${encodeURIComponent(proposalId)}`}>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            // onClick={createdId ? undefined : closeModal}
                                            >
                                                Take me back to the Proposal Page
                                            </button>
                                        </Link>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

VoteOnProposal.getLayout = getSidebarLayout;

export default VoteOnProposal;