export const fetchMeals = async (category) => {
  const url = `${import.meta.env.VITE_API_URL}/meals/${category}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Error loading meals", err);
    return [];
  }
};
