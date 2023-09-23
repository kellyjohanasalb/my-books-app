import { useState, useEffect } from 'react'
import { getBooks } from '../../services/booksService';
import './home.scss';


const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then((response) => {
            setBooks(response);
            console.log(response)
        })
    }, []);

    return (
        <main>
            <section className='filtersContainer'>
                <div>
                    <label>Filtrar por páginas</label>
                    <input type="range" min={0} max={100} step={10}/>
                </div>
                <div>
                    <label>Filtrar por género</label>
                    <select name="">
                        <option value={''}>Todas</option>
                    </select>
                </div>
            </section>
            <section className='cardsContainer'>
                {
                    books.length > 0 ? books.map((item, index) => <figure key={index}>
                        <img src={item.book.cover} alt={item.book.title} />
                    </figure>) : <div>...Cargando</div>
                }
            </section>
        </main>
    )
}

export default Home;