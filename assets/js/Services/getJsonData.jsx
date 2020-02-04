
export const getData = (name, item, json = true,) => {
    const value = item.getAttribute(`data-${name}`);
    return json ? JSON.parse(value) : value;
};
