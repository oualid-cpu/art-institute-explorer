// src/App.tsx
import { useState } from "react";
import { SearchBar } from "./components/Search/SearchBar";
import { ArtworkCard } from "./components/ArtworkCard/ArtworkCard";
import { searchArtworks, buildImageUrl } from "./api/aicClient";
import type { Artwork } from "./schemas/artwork";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [iiifUrl, setIiifUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await searchArtworks(query);

      setArtworks(result.artworks);
      setIiifUrl(result.iiifUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to load artworks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "1rem" }}>
      <h1>Art Institute Explorer</h1>
      <p style={{ color: "#555" }}>
        Search the Art Institute of Chicago collection and explore artworks.
      </p>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && artworks.length === 0 && (
        <p>Try searching for "Monet", "Impressionism", or "sculpture".</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {artworks.map((artwork) => {
          const imageUrl = buildImageUrl(iiifUrl, artwork.image_id);

          return (
            <ArtworkCard
              key={artwork.id}
              title={artwork.title}
              artistTitle={artwork.artist_title}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
