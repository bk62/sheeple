import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { CreateProposalSchema } from "../validation_schemas";


export const proposalRouter = router({
    create: publicProcedure // TODO protectedProcedure
        .input(CreateProposalSchema)
        .mutation(
            async ({ input, ctx }) => {
                const proposal = await ctx.prisma.proposal.create({ data: input });
                return proposal;
            }
        ),
    get: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(
            async ({ input, ctx }) => {
                const proposal = await ctx.prisma.proposal.findUniqueOrThrow({
                    where: {
                        id: String(input.id),
                        // published: true
                    }
                });
                return proposal;
            }
        ),
    getAll: publicProcedure.query(
        async ({ ctx }) => {
            return ctx.prisma.proposal.findMany();
        }
    )
});