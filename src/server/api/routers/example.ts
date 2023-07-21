import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getMessage: publicProcedure.mutation(({ ctx }) => {
    return { message: ctx.t("server:message-success") };
  }),
});
