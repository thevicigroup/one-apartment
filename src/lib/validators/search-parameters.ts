import * as z from "zod";

export const userParametersSchema = z.object({
    bath: z.string(),
    beds: z.string(),
    traveltime: z.string(),
    travelmode: z.string(),
});
