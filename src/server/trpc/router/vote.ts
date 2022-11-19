import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { VoteSchema, ChoiceCodes } from "../validation_schemas";


export const voteRouter = router({
    vote: protectedProcedure
        .input(VoteSchema)
        .mutation(
            async ({ input, ctx }) => {
                // TODO hardcoded for OZ gov simple counter rn
                const voterId = ctx.session?.user?.id;
                const vote = await ctx.prisma.vote.create({
                    data: {
                        // choiceCode: ChoiceCodes[input.choice || ],
                        ...input,
                        voterId
                    }
                });
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