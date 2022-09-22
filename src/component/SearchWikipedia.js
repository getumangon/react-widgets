import axios from "axios";
import React, { useEffect, useState } from "react";
import data from '../data/items';

function SearchWikipedia({ }) {
    const [term, setTerm] = useState("Program");
    const [debounceTerm, setDebounceTerm] = useState(term);
    const [result, setResult] = useState([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceTerm(term);
        }, 500);
        console.log("useEffect 1---", debounceTerm);
        return () => {
            clearTimeout(timerId);
        };

    }, [term]);

    useEffect(() => {
        const searchAPI = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debounceTerm
                }
            })
            setResult(data.query.search);
        }
        searchAPI();
        console.log("CALLED---", debounceTerm);
    }, [debounceTerm]);


    const renderResult = result.map((res) => {
        return (
            <div key={res.pageid} className="item">
                <div className="right floated content">
                    <a href={`https://en.wikipedia.org?curid=${res.pageid}`} className="ui button">GO</a>
                </div>
                <div className="content">
                    <div className="header">{res.title}</div>
                    <span dangerouslySetInnerHTML={{ __html: res.snippet }}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>
                        Enter Search Term
                    </label>
                    <input
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className='input'
                    />
                </div>
            </div>
            <div className="ui celled list">{renderResult}</div>
        </div>
    );
}

export default SearchWikipedia;
