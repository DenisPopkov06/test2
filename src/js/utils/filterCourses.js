import { ALL_CATEGORY_ID, CATEGORIES } from '../data/constants.js';

export function filterCourses(courses, category, search) {
  const query = search.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesCategory =
      category === ALL_CATEGORY_ID || course.category === category;
    const matchesSearch = !query || course.title.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

export function getCategoryCounts(courses, search = '') {
  const query = search.trim().toLowerCase();
  const matched = query
    ? courses.filter((course) => course.title.toLowerCase().includes(query))
    : courses;

  const counts = Object.fromEntries(
    CATEGORIES.map(({ id }) => [
      id,
      id === ALL_CATEGORY_ID ? matched.length : 0,
    ]),
  );

  matched.forEach((course) => {
    if (Object.hasOwn(counts, course.category)) {
      counts[course.category] += 1;
    }
  });

  return counts;
}
