import { z } from "zod";
import { ArtworkSchema, type Artwork } from "../schemas/artwork";

const API_BASE_URL = "https://api.artic.edu/api/v1";

const ArtworksSearchResponseSchema = z.object({
  data: z.array(ArtworkSchema),
  config: z
    .object({
      iiif_url: z.string().url(),
    })
    .optional(),
});

type ArtworksSearchResponse = z.infer<typeof ArtworksSearchResponseSchema>;

export type SearchArtworksResult = {
  artworks: Artwork[];
  iiifUrl: string | null;
};

export async function searchArtworks(
  query: string
): Promise<SearchArtworksResult> {
  if (!query.trim()) {
    return { artworks: [], iiifUrl: null };
  }

  const url = new URL(`${API_BASE_URL}/artworks/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("fields", "id,title,artist_title,image_id");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  const parsed = ArtworksSearchResponseSchema.safeParse(json);

  if (!parsed.success) {
    console.error("Zod validation error:", parsed.error);
    throw new Error("Invalid data from Art Institute API");
  }

  const data: ArtworksSearchResponse = parsed.data;

  const iiifUrl = data.config?.iiif_url ?? null;

  return {
    artworks: data.data,
    iiifUrl,
  };
}

export function buildImageUrl(
  iiifUrl: string | null,
  imageId: string | null | undefined
): string | null {
  if (!iiifUrl || !imageId) return null;
  return `${iiifUrl}/${imageId}/full/843,/0/default.jpg`;
}
