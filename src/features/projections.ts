export type ProjectionPoint = {
  month: number;
  monthlyCost: number;
};

export function buildGrowthProjection(
  baseMonthlyCost: number,
  growthRatePercent: number,
  months: number
): ProjectionPoint[] {
  const safeMonths = Math.max(1, months);
  const growth = Math.max(growthRatePercent, 0) / 100;

  return Array.from({ length: safeMonths }, (_, index) => {
    const month = index + 1;
    const multiplier = Math.pow(1 + growth, index);
    return {
      month,
      monthlyCost: baseMonthlyCost * multiplier
    };
  });
}
