import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { AddDaoSchema } from "../validation_schemas";


export const daoRouter = router({
  add: protectedProcedure
    .input(AddDaoSchema)
    .mutation(
      async ({ input, ctx }) => {
        const dao = await ctx.prisma.dao.create({ data: input });
        return dao;
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
        const dao = await ctx.prisma.dao.findUniqueOrThrow({
          where: {
            id: String(input.id),
            // published: true, // TODO
          },
        });
        return dao;
      }
    ),
  getAll: publicProcedure.query(
    async ({ ctx }) => {
      return ctx.prisma.dao.findMany();
    }
  ),
});
