import * as z from "zod";

export const userParametersSchema = z.object({
    address: z.string(),
    bath: z.string(),
    beds: z.string(),
    traveltime: z.string(),
    travelmode: z.string(),
});
