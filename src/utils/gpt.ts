const LOREM_WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ");

export function generateLoremIpsumGPT(length: number): string {
  if (length <= 0) return "";

  let result = "";
  while (result.length < length) {
    result += LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)] + " ";
  }

  return result.substring(0, length).trim();
}
