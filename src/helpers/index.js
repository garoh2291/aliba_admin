export const generateQuery = (_searchSortQuery) => {
  let query = "";
  _searchSortQuery.forEach((item) => {
    if (item.queryValue !== "") {
      return (query += `${item.queryRoute}=${item.queryValue}&`);
    }
  });
  return query;
};
