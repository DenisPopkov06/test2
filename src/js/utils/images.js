const instructorByAuthor = {
  'Jerome Bell': 'src/assets/JeromeBell.png',
  'Marvin McKinney': 'src/assets/MarvinMcKinney.png',
  'Leslie Alexander Li': 'src/assets/LeslieAlexanderLi.png',
  'Kristin Watson': 'src/assets/KristinWatson.png',
  'Guy Hawkins': 'src/assets/GuyHawkins.png',
  'Dianne Russell': 'src/assets/DianneRussell.png',
  'Brooklyn Simmons': 'src/assets/BrooklynSimmons.png',
  'Kathryn Murphy': 'src/assets/KarthynMurphy.png',
  'Cody Fisher': 'src/assets/CodyFisher.png',
};

const fallbackImages = [
  'src/assets/JeromeBell.png',
  'src/assets/MarvinMcKinney.png',
  'src/assets/LeslieAlexanderLi.png',
  'src/assets/KristinWatson.png',
  'src/assets/GuyHawkins.png',
  'src/assets/DianneRussell.png',
  'src/assets/BrooklynSimmons.png',
  'src/assets/KarthynMurphy.png',
  'src/assets/CodyFisher.png',
];

export function getInstructorImage(author, courseId) {
  return instructorByAuthor[author] ?? fallbackImages[(courseId - 1) % fallbackImages.length];
}
