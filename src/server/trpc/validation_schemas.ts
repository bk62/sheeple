import { z } from "zod";

export const AddDaoSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(5).optional(),
    // address: z.string().optional(),
    // ipfs: z.string().optional(),
});



export const CreateProposalSchema = z.object({
    daoId: z.string().min(1),
    title: z.string().min(2),
    body: z.string().min(5).optional(),
});