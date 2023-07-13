export function contentComponent(description: string) {
  const maxLimit = 200;
  let truncatedDescription = description;

  if (description.length > maxLimit) {
    truncatedDescription = description.substring(0, maxLimit) + "...";
  }

  return truncatedDescription;
}
