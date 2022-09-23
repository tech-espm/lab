export const capitalize = (s: string, capitalizeOnlyFirstWord = false) => {
  let words = s.split(" ");
  if (capitalizeOnlyFirstWord) {
    words = [s];
  }
  const capitalizedWords = words.map((word) => {
    let w = word.toLowerCase();
    if (w.length <= 1) {
      return w.charAt(0).toUpperCase();
    }
    return w.charAt(0).toUpperCase() + w.slice(1);
  });
  return capitalizedWords.join(" ");
};

export const removeAllAccents = (s: string) => {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
