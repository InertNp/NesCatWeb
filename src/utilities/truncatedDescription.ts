export function descriptionComponent(description: string) {
  const maxLimit = 500;
  let truncatedDescription = description;

  if (description.length > maxLimit) {
    truncatedDescription = description.substring(0, maxLimit) + "...";
  }

  return truncatedDescription;
}
