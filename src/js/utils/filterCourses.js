export function filterCourses(courses, category, search) {
  const query = search.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesCategory = category === 'all' || course.category === category;
    const matchesSearch = !query || course.title.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

export function getCategoryCounts(courses, search = '') {
  const query = search.trim().toLowerCase();
  const matched = query
    ? courses.filter((course) => course.title.toLowerCase().includes(query))
    : courses;

  const counts = { all: matched.length };

  matched.forEach((course) => {
    counts[course.category] = (counts[course.category] ?? 0) + 1;
  });

  return counts;
}
