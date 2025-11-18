import { z } from "zod";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .optional()
    .transform((val) => (val && val.trim().length > 0 ? val : "Untitled")),
  artist_title: z
    .string()
    .nullable()
    .optional()
    .transform((val) =>
      val && val.trim().length > 0 ? val : "Unknown artist"
    ),
  image_id: z.string().nullable().optional(),
});

export type Artwork = z.infer<typeof ArtworkSchema>;
