export interface LcmParams {
    numbers: bigint[]
}

function gcd(a: bigint, b: bigint): bigint {
  while (a && b) a > b ? (a %= b) : (b %= a);
  return a || b;
}

export default function lcm({ numbers }: LcmParams): string {
  return numbers.reduce((a, b) => a * b / gcd(a, b)).toString();
}