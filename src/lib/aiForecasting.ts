export interface DemandPrediction {
  nextOrderDate: string;
  expectedMembers: number;
  confidenceScore: number;
  reasoning: string;
  suggestedAction: string;
}

export function predictDemand(
  product: string,
  historicalData: unknown[],
  seasonality: string,
): DemandPrediction | undefined {
  void historicalData;
  void seasonality;

  const predictions: Record<string, DemandPrediction> = {
    'Wheat Flour': {
      nextOrderDate: '2026-03-01',
      expectedMembers: 47,
      confidenceScore: 94,
      reasoning: 'Seasonal spike + festival demand',
      suggestedAction: 'Form group now for 22% discount',
    },
    'Cooking Oil': {
      nextOrderDate: '2026-02-28',
      expectedMembers: 35,
      confidenceScore: 89,
      reasoning: 'Monthly restock pattern detected',
      suggestedAction: 'Wait 2 days for better pricing',
    },
  };

  return predictions[product];
}
