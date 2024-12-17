export function pageCount(totalPages: number, formState: any): number {
  let pagesCount = totalPages;

  switch (formState.pages) {
    case "even":
      pagesCount = Math.floor(totalPages / 2);
      break;
    case "odd":
      pagesCount = Math.ceil(totalPages / 2);
      break;
    case "custom":
      pagesCount = parseCustomPages(formState.customPages, totalPages);
      break;
    case "all":
    default:
      break;
  }

  const totalSheets = Math.ceil(pagesCount / formState.pagesPerSheet);

  return totalSheets;
}

function parseCustomPages(customPagesStr: string, totalPages: number): number {
  const ranges = customPagesStr.split(",").map((range) => range.trim());
  const pagesSet = new Set<number>();

  ranges.forEach((range) => {
    if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = Math.max(start, 1); i <= Math.min(end, totalPages); i++) {
          pagesSet.add(i);
        }
      }
    } else {
      const page = Number(range);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        pagesSet.add(page);
      }
    }
  });

  return Array.from(pagesSet).sort((a, b) => a - b).length;
}
