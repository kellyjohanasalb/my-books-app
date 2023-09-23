import axios from "axios";
import endpoints from "./endpoints";

export const getBooks = async() => {
    try {
        const { data } = await axios.get(endpoints.library);
        return data;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}
