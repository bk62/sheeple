import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Link from "next/link";

import { prisma } from "../../server/db/client";

const DaoDetail: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>
    = ({ dao }) => {
        return (
            <>
                <h1>{dao.name}</h1>
                <h2>Proposals:</h2>
                <ul>
                    {dao.proposals.map((proposal: typeof dao.proposals[number]) => (
                        <li key={proposal.id}>
                            <Link href={`/proposals/${encodeURIComponent(proposal.id)}`}>
                                {proposal.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </>
        )
    }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const query = {
        where: {
            id: String(params?.id),
            // published: true, // TODO
        },
        include: {
            proposals: {
                select: {
                    id: true, title: true, body: true
                }
            }
        }
    };
    try {
        const dao = await prisma.dao.findUniqueOrThrow(query);
        return {
            props: { dao }
        }
    } catch (err) {
        return {
            notFound: true
        }
    }

}


export default DaoDetail;

