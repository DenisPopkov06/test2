export const ALL_CATEGORY_ID = 'all';

export const CATEGORIES = [
  { id: ALL_CATEGORY_ID, label: 'All' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'management', label: 'Management' },
  { id: 'hr', label: 'HR & Recruiting' },
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Development' },
];

export const CATEGORY_LABELS = Object.fromEntries(
  CATEGORIES.map(({ id, label }) => [id, label]),
);

export const COURSE_CATEGORY_IDS = CATEGORIES.filter(
  ({ id }) => id !== ALL_CATEGORY_ID,
).map(({ id }) => id);

export const INITIAL_VISIBLE_COUNT = 9;
