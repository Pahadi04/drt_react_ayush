export const fetchSatellites = async (
  objectTypes: string[],
  attributes: string[]
) => {
  const endpoint = 'https://backend.digantara.dev/v1/satellites';
  const queryParams = new URLSearchParams({
    objectTypes: objectTypes.join(','),
    attributes: attributes.join(','),
  });

  const url = `${endpoint}?${queryParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch satellite data');
  }

  return response.json();
};
