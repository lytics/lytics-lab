interface Recommendation {
  url: string;
  title: string;
  imageurls: string[];
  description: string;
}

export interface RecommendationOptions {
  type: string;
  collection: string;
  engine: string;
  segment: string;
  url: string;
  noShuffle: boolean;
  includeViewed: boolean;
  showHeadline: boolean;
  showImage: boolean;
  showBody: boolean;
}

export async function getRecommendation(
  accountId: string,
  uid: string,
  options: RecommendationOptions,
): Promise<Recommendation[]> {
  let baseURL = `https://api.lytics.io/api/content/recommend/${accountId}/user/_uid/${uid}`;
  // if (options.segment !== "") {
  //   baseURL = `https://api.lytics.io/api/content/recommend/${accountId}/segment/${options.segment}`;
  // }

  let parts = [];
  // add account id
  if (!accountId) {
    console.error("Account ID is required to generate recommendations.");
    return [];
  }

  parts.push(`account=${accountId}`);

  // check collection
  if (options.collection) {
    parts.push(`contentsegment=${options.collection}`);
  }

  // check engine
  if (options.engine) {
    parts.push(`config=${options.engine}`);
  }

  // check shuffle
  if (options.noShuffle) {
    parts.push("shuffle=false");
  } else {
    parts.push("shuffle=true");
  }

  // check excludeViewed
  if (options.includeViewed) {
    parts.push("visited=true");
  } else {
    parts.push("visited=false");
  }

  // set limit
  parts.push("limit=15");

  // build url from base and parts
  const url = `${baseURL}?${parts.join("&")}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.data;
}
