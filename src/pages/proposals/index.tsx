import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";

import { prisma } from "../../server/db/client";


const ProposalList: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ proposals }) => {
    return (
        <ul>
            {proposals.map((proposal: typeof proposals[number]) =>
                <li key={proposal.id}>
                    <Link href={`/proposals/${encodeURIComponent(proposal.id)}`}>
                        {proposal.title}
                    </Link>
                </li>
            )}
        </ul>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const proposals = await prisma.proposal.findMany({
        // where: { published: true },
        select: {
            id: true, title: true, body: true,
        }
    });
    return {
        props: { proposals },
        revalidate: 10
    }
}

export default ProposalList;