import { useState, useEffect } from 'react'
import { getBooks } from '../../services/booksService';
import './home.scss';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [filterResult, setFilterResult] = useState([]);
    const [responseFilter, setResponseFilter] = useState('');
    const [categories, setCategories] = useState([]);
    const [rangePages, setRangePages] = useState({
        min: 0,
        max: 1000,
        step: 10
    });
    const [filters, setFilters] = useState({})

    useEffect(() => {
        getBooks().then((response) => {
            setBooks(response);
            console.log(response)
            const categoriesLis = getCategories(response);
            const range = getPages(response);
            setCategories(categoriesLis);
            setRangePages({
                ...rangePages,
                ...range
            })
        })
    }, []);

    //Función que permita extraer las categorías del listado de libros que nos suministra API
    const getCategories = (bookList) => {
        const categoryList = bookList.map((item) => item.book.genre)
        const categoryItems = new Set(categoryList);
        return [...categoryItems]
    }

    //Función que nos permita extraer la cantidad mínima y máxima de páginas de los libros
    const getPages = (bookList) => {
        const ranges = bookList.map(item => item.book.pages);
        return {
            min: Math.floor(Math.min(...ranges) / 1000) * 1000,
            max: Math.ceil(Math.max(...ranges) / 1000) * 1000
        }
    }

    const onFilter = (event) => {
        const { name, value } = event.target;
        const filterParams = {
            ...filters,
            [name]: value
        }
        setFilters(filterParams)
        // console.log({
        //     ...filters,
        //     [name]: value
        // })
        if (value) {
            let filtered = [...books];
            for (const key in filterParams) {
                if (filterParams[key]) {
                    const filteredResult = key === 'pages' ? filtered.filter(element => element.book[key] <= filterParams[key]) : filtered.filter((element) => element.book[key] == filterParams[key])
                    filtered = [...filteredResult];
                }
            }
            // console.log(filtered);
            setFilterResult(filtered);
            setResponseFilter(()=>filtered.length?'': 'No se encontraron resultados')
        } else {
            setFilterResult([]);
            setResponseFilter('Filtros limpiados')
        }


    }

    return (
        <main>
            <section className='filtersContainer'>
                <div>
                    <label>Filtrar por páginas</label>
                    <input type="range" min={rangePages.min} max={rangePages.max} step={rangePages.step} onChange={onFilter} name="pages" value={filters.pages} />
                </div>
                <div>
                    <label>Filtrar por género</label>
                    <select name="genre" onChange={onFilter} value={filters.genre}>
                        <option value={''}>Todas</option>
                        {
                            categories.length ? categories.map((item, index) => <option key={index} value={item}>{item}</option>) : <></>
                        }
                    </select>
                </div>
            </section>
            {
                responseFilter && <h2>{responseFilter}</h2>
            }
            <section className='cardsContainer'>
                {
                    filterResult.length ? filterResult.map((item, index) => <figure key={index}>
                        <img src={item.book.cover} alt={item.book.title} />
                    </figure>):
                    books.length > 0 ? books.map((item, index) => <figure key={index}>
                        <img src={item.book.cover} alt={item.book.title} />
                    </figure>) : <div>...Cargando</div>
                }
            </section>
        </main>
    )
}

export default Home;