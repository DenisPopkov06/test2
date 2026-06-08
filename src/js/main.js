import { CourseCatalog } from './catalog/CourseCatalog.js';

new CourseCatalog({
  filters: document.getElementById('course-filters'),
  search: document.getElementById('course-search'),
  empty: document.getElementById('course-empty'),
  grid: document.getElementById('course-grid'),
  toggle: document.getElementById('course-toggle'),
});
