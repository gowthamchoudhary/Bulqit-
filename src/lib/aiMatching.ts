import { pipeline, env } from '@xenova/transformers';
import { Retailer, MatchResult } from '@/types/retailer';

let embedder: any = null;

// Browser runtime settings: force remote model fetch and avoid Vite HTML fallback.
env.allowLocalModels = false;
env.allowRemoteModels = true;
env.useBrowserCache = false;
// Explicitly point to Hugging Face host/path to avoid relative URL resolution in dev server.
env.remoteHost = 'https://huggingface.co';
env.remotePathTemplate = '{model}/resolve/{revision}/';

/**
 * Initialize the embedding model (runs in browser!)
 */
async function initializeEmbedder() {
  if (!embedder) {
    console.log('Loading AI model...');
    try {
      embedder = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2',
        {
          revision: 'main',
        },
      );
      console.log('AI model loaded!');
    } catch (error) {
      console.error('AI model failed to load', {
        error,
        remoteHost: env.remoteHost,
        remotePathTemplate: env.remotePathTemplate,
      });
      throw error;
    }
  }
  return embedder;
}

/**
 * Generate embedding for product list
 */
async function generateEmbedding(products: string[]): Promise<number[]> {
  const model = await initializeEmbedder();
  const text = products.join(' ');
  const output = await model(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data as Float32Array);
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * (vecB[i] ?? 0), 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Calculate distance using Haversine formula
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * REAL AI-POWERED MATCHING
 */
export async function findAIMatches(
  currentRetailer: Retailer,
  allRetailers: Retailer[],
): Promise<MatchResult[]> {
  console.log('Starting AI matching...');

  // Generate embedding for current retailer
  const currentEmbedding = await generateEmbedding(currentRetailer.products);

  // Filter and score other retailers
  const matches: MatchResult[] = [];

  for (const retailer of allRetailers) {
    if (retailer.id === currentRetailer.id) continue;

    // Generate embedding for this retailer
    const retailerEmbedding = await generateEmbedding(retailer.products);

    // Calculate AI similarity score (0-1)
    const aiSimilarity = cosineSimilarity(currentEmbedding, retailerEmbedding);

    // Calculate distance
    const distance = calculateDistance(
      currentRetailer.location.coordinates.lat,
      currentRetailer.location.coordinates.lng,
      retailer.location.coordinates.lat,
      retailer.location.coordinates.lng,
    );

    // Skip if too far
    if (distance > 10) continue;

    // Find shared products
    const sharedProducts = retailer.products.filter((p) =>
      currentRetailer.products.some((cp) => cp.toLowerCase() === p.toLowerCase()),
    );

    // Calculate final match score
    const productScore = aiSimilarity * 40; // AI similarity (40%)
    const distanceScore = Math.max(0, 1 - distance / 10) * 30; // Distance (30%)
    const budgetRatio =
      Math.min(currentRetailer.monthlyBudget, retailer.monthlyBudget) /
      Math.max(currentRetailer.monthlyBudget, retailer.monthlyBudget);
    const budgetScore = budgetRatio * 20; // Budget similarity (20%)
    const typeBonus =
      currentRetailer.storeType === retailer.storeType ? 10 : 5; // Type (10%)

    const matchScore = Math.round(
      productScore + distanceScore + budgetScore + typeBonus,
    );

    // Estimate savings
    const savingsPercent = 0.15 + (matchScore / 100) * 0.05; // 15-20%
    const estimatedSavings = Math.round(currentRetailer.monthlyBudget * savingsPercent);

    matches.push({
      retailer,
      matchScore,
      distance,
      sharedProducts,
      estimatedSavings,
      explanation: `${sharedProducts.length} products in common | ${distance}km away | AI confidence: ${Math.round(aiSimilarity * 100)}%`,
    });
  }

  // Sort by match score
  const sorted = matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .filter((m) => m.matchScore > 40) // Only decent matches
    .slice(0, 10);

  console.log(`Found ${sorted.length} AI matches`);
  return sorted;
}

/**
 * Cache embeddings for performance
 */
const embeddingCache = new Map<string, number[]>();

export async function getCachedEmbedding(products: string[]): Promise<number[]> {
  const key = [...products].sort().join('|');

  if (embeddingCache.has(key)) {
    return embeddingCache.get(key)!;
  }

  const embedding = await generateEmbedding(products);
  embeddingCache.set(key, embedding);
  return embedding;
}



