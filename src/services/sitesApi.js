import { mockSites } from "../mock/mockSites";
export async function getSites() {
  try {
    const response = await fetch("/api/sites");
    if (!response.ok) return mockSites;
    return await response.json();
  } catch (error) {
    return mockSites;
  }
}
