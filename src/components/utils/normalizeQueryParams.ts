const normalizeQueryParams = (obj: { [key: string]: string | number }) => {
  return Object.entries(obj)
    .filter(([, value]) => !!value !== false)
    .reduce((acc, [key, value]) => {
      key.includes("-") ? (key = key.replace("-", ".")) : key;
      return { ...acc, [key]: value };
    }, {});
};

export default normalizeQueryParams;
