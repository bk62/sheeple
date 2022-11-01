import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";

import { prisma } from "../../server/db/client";


const DaoList: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ daos }) => {
    return (
        <>
            <Link href="/daos/add">Add a DAO</Link>
            <ul>
                {daos.map((dao: typeof daos[number]) =>
                    <li key={dao.id}>
                        <Link href={`/daos/${encodeURIComponent(dao.id)}`}>
                            {dao.name}
                        </Link>
                    </li>
                )}
            </ul>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const daos = await prisma.dao.findMany({
        // where: { published: true }
    });
    return {
        props: { daos },
        revalidate: 10
    }
}

export default DaoList;