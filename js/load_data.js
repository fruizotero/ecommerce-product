

export const fetchData = async () => {
    try {

        let res = await fetch("../data.json");
        let json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        return json;

    } catch (error) {
        console.log(error);
    }


}