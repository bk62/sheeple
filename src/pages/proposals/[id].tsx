import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Link from "next/link";

import { prisma } from "../../server/db/client";

const ProposalDetail: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>
    = ({ proposal }) => {
        return (
            <>
                <h1>{proposal.title}</h1>
                <p>{proposal.body ?? ""}</p>
                <Link href={`/daos/${encodeURIComponent(proposal.dao.id)}/proposals/${encodeURIComponent(proposal.id)}/vote`}>Cast your Vote</Link>
                <Link href={`/daos/${encodeURIComponent(proposal.dao.id)}`}>Back to DAO Dashboard</Link>
            </>
        )
    }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const query = {
        where: {
            id: String(params?.id),
            // published: true, // TODO
        },
        select: {
            id: true,
            title: true,
            body: true,
            dao: {
                select: {
                    id: true
                }
            }
        },
    };
    try {
        const proposal = await prisma.proposal.findUniqueOrThrow(query);
        return {
            props: { proposal }
        }
    } catch (err) {
        return {
            notFound: true
        }
    }
}


export default ProposalDetail;

