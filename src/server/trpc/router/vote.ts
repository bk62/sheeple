import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { VoteSchema } from "../validation_schemas";


export const voteRouter = router({
    vote: publicProcedure
        .input(VoteSchema)
        .mutation(
            async ({ input, ctx }) => {
                const vote = await ctx.prisma.vote.create({ data: input });
                return vote;
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
                const vote = await ctx.prisma.vote.findUnique({
                    where: {
                        id: String(input.id),
                    }
                });
                return vote;
            }
        ),
    getAll: publicProcedure
        .input(
            z.object({
                voterId: z.string().optional(),
                daoId: z.string().optional(),
                proposalId: z.string().optional(),
            })
        )
        .query(
            async ({ input, ctx }) => {
                const votes = await ctx.prisma.vote.findMany({
                    where: input
                });
                return votes;
            }
        )
});