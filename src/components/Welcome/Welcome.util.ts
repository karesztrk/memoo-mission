/**
 * @throws {Error} Name is required
 */
export const validate = (data: FormData): { name: string } => {
  const name = data.get("name") as string | null;
  if (!name) {
    throw new Error("Name is required");
  }
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Name is required");
  }
  return {
    name: trimmedName,
  };
};
