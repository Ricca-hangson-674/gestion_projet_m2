export const isEmptyObject = (object) => {
    for (const property in object) {
        return false;
    }
    return true;
};

// _.isEmpty({}); // true