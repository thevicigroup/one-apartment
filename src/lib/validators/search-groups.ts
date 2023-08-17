import * as z from "zod";

// prettier-ignore
export const userGroupsSchema = z.object({
    id:         z.string().uuid(),
    nickname:   z.string().min(1, { message: "You must add a nickname" }),
    members:    z.string().min(2, { message: "You must have at least 2 members to a group" }),
    isSaved: z.boolean().default(false)
});
