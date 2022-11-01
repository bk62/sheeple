import { router } from "../trpc";
import { authRouter } from "./auth";
import { daoRouter } from "./dao";
import { proposalRouter } from "./proposal";
import { voteRouter } from "./vote";


export const appRouter = router({
  dao: daoRouter,
  proposal: proposalRouter,
  vote: voteRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
