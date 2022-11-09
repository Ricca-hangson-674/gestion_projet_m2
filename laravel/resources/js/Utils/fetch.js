export const load = async (url) => {
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch (e) {
        console.log("error", e);
    }

    // console.log(obj);
};