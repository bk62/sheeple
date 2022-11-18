import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";

import type { WithGetLayout } from "../page";
import { prisma } from "../../server/db/client";
import { getSidebarLayout } from "../../components/layouts/sidebar";
import Card from "../../components/Card";
import Button from "../../components/controls/buttons";

const DaoList: React.FC<InferGetStaticPropsType<typeof getStaticProps>> & WithGetLayout = ({ daos }) => {
    return (
        <>
            <Link href="/daos/add">
                <Button variant="primary" className="mb-5">
                    Add a DAO
                </Button>
            </Link>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {daos.map((dao: typeof daos[number]) =>
                    <div key={dao.id}>
                        <Link href={`/daos/${encodeURIComponent(dao.id)}`} key={dao.id} className="group">
                            <Card title={dao.name} text={dao.description}>
                            </Card>
                        </Link>
                    </div>
                )}
            </div>
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

DaoList.getLayout = getSidebarLayout;

export default DaoList;