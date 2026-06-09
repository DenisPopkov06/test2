import { CATEGORY_LABELS } from '../data/constants.js';
import { getInstructorImage } from '../utils/images.js';

const cardCache = new Map();

const courseCardTemplate = document.getElementById('course-card-template');
const filterTemplate = document.getElementById('filter-template');
const toggleTemplate = document.getElementById('toggle-template');

export function createCourseCard(course) {
  const item = courseCardTemplate.content.firstElementChild.cloneNode(true);
  const photo = item.querySelector('.course-card__photo');
  const badge = item.querySelector('.course-card__badge');

  photo.src = getInstructorImage(course.author, course.id);
  photo.alt = course.author;

  badge.textContent = CATEGORY_LABELS[course.category] ?? course.category;
  badge.dataset.category = course.category;

  item.querySelector('.course-card__title').textContent = course.title;
  item.querySelector('.course-card__price').textContent = `$${course.price}`;
  item.querySelector('.course-card__author').textContent = `by ${course.author}`;

  return item;
}

function getOrCreateCard(course) {
  const id = String(course.id);
  let card = cardCache.get(id);

  if (!card) {
    card = createCourseCard(course);
    card.dataset.courseId = id;
    cardCache.set(id, card);
  }

  return card;
}

export function renderGrid(container, courses) {
  const fragment = document.createDocumentFragment();

  courses.forEach((course) => {
    fragment.appendChild(getOrCreateCard(course));
  });

  container.replaceChildren(fragment);
}

export function appendGrid(container, courses, fromIndex) {
  const fragment = document.createDocumentFragment();

  courses.slice(fromIndex).forEach((course) => {
    fragment.appendChild(getOrCreateCard(course));
  });

  container.appendChild(fragment);
}

export function renderEmpty(empty, grid, isEmpty) {
  empty.hidden = !isEmpty;
  grid.hidden = isEmpty;
}

export function setGridBusy(grid, isBusy) {
  grid.setAttribute('aria-busy', String(isBusy));
}

export function initFilters(container, categoryOptions) {
  const fragment = document.createDocumentFragment();

  categoryOptions.forEach(({ id, label }) => {
    const button = filterTemplate.content.firstElementChild.cloneNode(true);
    button.dataset.category = id;
    button.querySelector('.courses__filter-label').textContent = label;
    fragment.appendChild(button);
  });

  container.replaceChildren(fragment);
}

export function updateFilters(container, { category, categoryCounts }) {
  container.querySelectorAll('.courses__filter').forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle('courses__filter--active', isActive);
    button.setAttribute('aria-selected', String(isActive));

    const countEl = button.querySelector('.courses__filter-count');
    if (countEl) {
      countEl.textContent = categoryCounts[button.dataset.category] ?? 0;
    }
  });
}

export function renderToggle(container, { hasMore, canCollapse }) {
  if (!hasMore && !canCollapse) {
    container.replaceChildren();
    return;
  }

  const button = toggleTemplate.content.firstElementChild.cloneNode(true);
  const icon = button.querySelector('.courses__toggle-icon');

  if (hasMore) {
    button.dataset.action = 'load-more';
    button.querySelector('.courses__toggle-text').textContent = 'Load more';
  } else {
    button.dataset.action = 'collapse';
    icon.classList.add('courses__toggle-icon--collapsed');
    button.querySelector('.courses__toggle-text').textContent = 'Show less';
  }

  container.replaceChildren(button);
}
