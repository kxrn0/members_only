module.exports = function get_indices(
  totalPages,
  pagesPerSection,
  currentPage
) {
  const pages = [];

  if (totalPages <= pagesPerSection) {
    for (let i = 0; i < totalPages; i++) pages.push(i + 1);

    return pages;
  }

  const middle = ~~(pagesPerSection / 2);

  if (currentPage <= middle) {
    for (let i = 0; i < pagesPerSection; i++) pages.push(i + 1);
    return pages;
  }

  const end = totalPages - currentPage;

  if (end <= middle) {
    for (let i = 0; i < pagesPerSection; i++) pages.push(totalPages - i);
    return pages.reverse();
  }

  for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);

  return pages;
};
