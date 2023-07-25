import * as z from "zod";

// prettier-ignore
export const userParametersSchema = z.object({
    id:         z.string().uuid(),
    address:    z.string().min(1, { message: "You must enter an address" }),
    nickname:   z.string().min(1, { message: "You must add a nickname" }),
    traveltime: z.string(),
    travelmode: z.string(),
    isSaved: z.boolean().default(false),
    index: z.number().default(0),
});

export const buildIsochronesFromParameters = z.object({
    parameters: z.object({
        id:         z.string().uuid(),
        address:    z.string().min(1, { message: "You must enter an address" }),
        nickname:   z.string().min(1, { message: "You must add a nickname" }),
        traveltime: z.string(),
        travelmode: z.string(),
        isSaved: z.boolean().default(false), 
    }).array(),
});
