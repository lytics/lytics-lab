// LyticsRecommendationBlock.ts

import { getRecommendation, RecommendationOptions } from "./api-recommendation";

class LyticsRecommendationBlock {
  private static attached: boolean = false;

  private static injectStyles(): void {
    if (document.getElementById("lytics-recommendation-styles")) return;

    const style = document.createElement("style");
    style.id = "lytics-recommendation-styles";
    style.textContent = `
      [id^="lytics-rec-container-"] {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }

      [id^="lytics-rec-container-"] .lytics-rec-item {
        flex: 1;
      }
        
      [id^="lytics-rec-container-"] .lytics-rec-item .lytics-rec-img {
        
      }

      [id^="lytics-rec-container-"] .lytics-rec-item .lytics-rec-title {
        font-size: 16px;
        font-weight: bold;
      }

      [id^="lytics-rec-container-"] .lytics-rec-item .lytics-rec-description {
        font-size: 14px;
        line-height: 14px;
      }
    `;
    document.head.appendChild(style);
  }

  public static attach(context: HTMLElement): void {
    if (!LyticsRecommendationBlock.attached) {
      LyticsRecommendationBlock.attached = true;

      // Inject styles into the document
      LyticsRecommendationBlock.injectStyles();

      const populateRecommendation = async (entity: any): Promise<void> => {
        // Get the UID
        const uid = entity?.data?.user?._uid;

        // Get all Block Elements
        const recContainers = document.querySelectorAll(
          '[id*="lytics-rec-container-"]',
        );
        for (const element of Array.from(recContainers)) {
          const recommendationConfig = JSON.parse(
            atob(element.getAttribute("data-rec-config") || ""),
          );

          const accountId = recommendationConfig?.account_id;
          const target = recommendationConfig?.element;
          const maxItems = recommendationConfig?.number_of_recommendations;

          // if no account id, skip
          if (!accountId) {
            console.warn("No account ID provided for recommendations.");
            continue;
          }

          if (!uid) {
            console.warn("No visitor ID provided for recommendations.");
            continue;
          }

          // Validate options
          const options = {
            element: recommendationConfig?.element,
            type: recommendationConfig?.recommendation_type,
            collection: recommendationConfig?.content_collection_id,
            engine: recommendationConfig?.interest_engine_id,
            segment: recommendationConfig?.segment_id,
            url: recommendationConfig?.url,
            noShuffle: recommendationConfig?.dont_shuffle_results,
            includeViewed: recommendationConfig?.include_viewed_content,
            maxItems: recommendationConfig?.number_of_recommendations,
            showHeadline: recommendationConfig?.show_headline || true,
            showImage: recommendationConfig?.show_image || true,
            showBody: recommendationConfig?.show_body || false,
          } as RecommendationOptions;

          try {
            const data = await getRecommendation(accountId, uid, options);
            const recContainer = document.querySelector(`#${target}`);

            if (recContainer) {
              recContainer.innerHTML = "";

              let count = 0;

              // handle invalid response due to no recommendation or error
              if (!data || data.length === 0) {
                recContainer.innerHTML = "No recommendations available.";
                continue;
              }

              data.forEach((rec: any) => {
                if (count >= maxItems) {
                  return;
                }

                const recItem = document.createElement("div");

                recItem.classList.add("lytics-rec-item");

                if (options.showImage) {
                  if (
                    (rec?.primaryimageurl !== undefined &&
                      rec?.primaryimageurl !== "") ||
                    (rec?.imageurls?.length > 0 && rec?.imageurls?.[0] !== "")
                  ) {
                    const imgLink = document.createElement("a");
                    const protocol = window.location.protocol;
                    imgLink.href = `${protocol}//${rec.url}`;

                    const img = document.createElement("img");
                    img.classList.add("lytics-rec-img");
                    img.alt = `Image of ${rec.title}`;
                    img.src = rec.primaryimageurl || rec.imageurls[0];

                    imgLink.appendChild(img);
                    recItem.appendChild(imgLink);
                  } else {
                    return;
                  }
                }

                if (options.showHeadline) {
                  const recTitle = document.createElement("div");
                  recTitle.classList.add("lytics-rec-title");
                  recItem.appendChild(recTitle);

                  const titleLink = document.createElement("a");
                  const protocol = window.location.protocol;
                  titleLink.href = `${protocol}//${rec.url}`;
                  titleLink.innerHTML = `<strong>${rec.title}</strong>`;
                  recTitle.appendChild(titleLink);
                }

                if (options.showBody && rec.description) {
                  const description = document.createElement("p");
                  description.classList.add("lytics-rec-description");
                  description.textContent = rec.description;
                  recItem.appendChild(description);
                }

                recContainer.appendChild(recItem);

                count++;
              });
            }
          } catch (error) {
            console.error("Error fetching recommendations:", error);
          }
        }
      };

      // Call entityReady with populateRecommendation when the page loads
      (window as any).jstag.call("entityReady", populateRecommendation);
    }
  }
}

export default LyticsRecommendationBlock;
