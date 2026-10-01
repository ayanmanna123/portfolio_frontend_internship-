export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function estimateReadTime(text = '') {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getSkillCategoryColor(category) {
  switch (category) {
    case 'Frontend':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'Backend':
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    case 'Database':
      return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    case 'DevOps & Tools':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    default:
      return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
  }
}
