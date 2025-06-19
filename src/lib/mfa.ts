export function generateMfaCode(secret: string): string {
  // Simple deterministic mock: last 6 digits of hash
  let hash = 0;
  for (let i = 0; i < secret.length; i++) {
    hash = (hash * 31 + secret.charCodeAt(i)) % 1000000;
  }
  console.log('Generated hash:', hash);//782852
  return hash.toString().padStart(6, '0');
}