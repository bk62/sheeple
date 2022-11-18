import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import { useQuery, useMutation } from "@tanstack/react-query";
import { Dialog, Transition } from '@headlessui/react'

import type { WithGetLayout } from "../page";
import { trpc, type RouterTypes } from "../../utils/trpc";
import useZodForm from "../../hooks/useZodForm";
import { CreateProposalSchema } from "../../server/trpc/validation_schemas";
import { getSidebarLayout } from "../../components/layouts/sidebar";

import Button from "../../components/controls/buttons";
import { Input, Textarea, FormError } from "../../components/controls/input";
import Protected from "../../components/access/protected";
import ConnectWallet from "../../components/access/connect_wallet";


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { daoId } = query;
    return {
        props: {
            daoId
        }
    };

}

const CreateProposalForm: React.FC<{ daoId: string }> & WithGetLayout = ({ daoId }) => {
    const { data: session, status: sessionStatus } = useSession();

    const mutation = trpc.proposal.create.useMutation({
        // open modal linking to created item's page on success
        onSuccess: (data, variables, context) => {
            if (data.id) {
                setCreatedId(data.id);
            }
            openModal();
        }
    });
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

    // Success modal
    const [isOpen, setIsOpen] = useState(false);
    const [createdId, setCreatedId] = useState('')
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
                Create a Proposal
            </h1>
            <div className="form-subtitle">
                Please fill out the following form to create a Proposal
            </div>
            <form onSubmit={form.handleSubmit(triggerMutation)}>
                <fieldset className="w-full mb-6">
                    <label className="form-label" htmlFor="title">Title</label>
                    <Input
                        autoFocus
                        type="text"
                        placeholder="My Proposal Title"
                        className="w-full"
                        errorMessage={form.formState.errors.title?.message}
                        {...form.register("title", { required: false })}
                    />
                </fieldset>

                <fieldset className="w-full mb-6">
                    <label className="form-label" htmlFor="body">Body</label>
                    <Textarea
                        rows={8}
                        cols={50}
                        placeholder="Proposal Description"
                        errorMessage={form.formState.errors.body?.message}
                        {...form.register("body", { required: false })}
                    />
                </fieldset>


                <fieldset className={`w-full ${form.formState.errors.daoId?.message && "mb-6"}`}>
                    <input type="hidden" {...form.register("daoId")} />
                    {form.formState.errors.daoId?.message && (
                        <p>DAO ID associated with this proposal: {form.formState.errors.daoId?.message}</p>
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
                        {mutation.isLoading ? "Creating..." : "Create Proposal"}
                    </Button>

                    <Link href={`/daos/${encodeURIComponent(daoId)}`}>
                        <Button type="button">
                            Back to DAO
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
                                        Proposal Created
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Your Proposal has been successfully created. DAO members can now vote on them.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <Link href={createdId ? `/proposals/${encodeURIComponent(createdId)}` : "#"}>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={createdId ? undefined : closeModal}
                                            >
                                                Take me to the Proposal page
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
    );
}

CreateProposalForm.getLayout = getSidebarLayout

export default CreateProposalForm;