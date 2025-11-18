type ArtworkCardProps = {
  title: string;
  artistTitle: string;
  imageUrl: string | null;
};

export function ArtworkCard({
  title,
  artistTitle,
  imageUrl,
}: ArtworkCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "0.75rem",
        maxWidth: "250px",
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "4px",
            marginBottom: "0.5rem",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            paddingTop: "75%",
            background: "#f0f0f0",
            borderRadius: "4px",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem",
            color: "#777",
          }}
        >
          No image available
        </div>
      )}

      <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1rem" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
        {artistTitle}
      </p>
    </div>
  );
}
