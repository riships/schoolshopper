export const formatOptions = async (arr, label, value) => {
    const options = arr.map((item) => ({
        label: item[label],
        value: item[value],
    }));
    return options;
};