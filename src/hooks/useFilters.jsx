import { useState } from "react";

const useFilter = (initalValue={}) => {
    const [filters, setFilters] = useState(initalValue);
    const [filterResult, setFilterResult] = useState([]);
    const [responseFilter, setResponseFilter] = useState('');

    const handleFilter = (event, booksList) => {
        const { name, value } = event.target;
        const filterParams = {
            ...filters,
            [name]: value
        }

        let filtered = [...booksList];
        for (const key in filterParams) {
            if (filterParams[key]) {
                const filteredResult = !isNaN(filterParams[key]) ? filtered.filter(element => element.book[key] <= filterParams[key]) : filtered.filter((element) => element.book[key] == filterParams[key])
                filtered = [...filteredResult];
            }
        }

        setFilters(filterParams);
        setFilterResult(filtered);
        setResponseFilter(() => filtered.length ? '' : 'No se encontraron resultados')
    }
    return { filters, filterResult, responseFilter, setFilters, handleFilter }
}

export default useFilter;