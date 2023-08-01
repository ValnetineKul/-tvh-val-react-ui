const truncate = (label: string, characterLength: number): string => {
  return label.length > characterLength ? `${label.slice(0, characterLength - 1)}\u2026` : label;
};

export default truncate;
