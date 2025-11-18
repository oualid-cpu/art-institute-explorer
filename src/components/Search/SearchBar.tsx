import { FormEvent, useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.5rem",
        marginBottom: "1rem",
        padding: "1rem 0",
      }}
    >
      <input
        type="text"
        placeholder="Search artworks (e.g. Monet, landscape, sculpture)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ flex: 1, padding: "0.5rem" }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>
        Search
      </button>
    </form>
  );
}
