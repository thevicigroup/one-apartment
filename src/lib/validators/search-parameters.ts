import * as z from "zod";

// prettier-ignore
export const userParametersSchema = z.object({
    id:         z.string().uuid(),
    address:    z.string().min(1, { message: "You must enter an address" }),
    nickname:   z.string().min(1, { message: "You must add a nickname" }),
    traveltime: z.string(),
    travelmode: z.string(),
    isSaved: z.boolean().default(false),
});
