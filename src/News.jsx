import React, { useState, useRef } from 'react';
import './news.css';

export default function News() {
    const [data, setData] = useState({
        error: false,
        news: []
    });

    const inputRef = useRef();


    async function fetchData() {
        const url = `https://real-time-news-data.p.rapidapi.com/search?query=${inputRef.current.value}&country=US&lang=en`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4685e83adbmshbe621af8b52500bp19db03jsna57eb0a7e344',
                'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Error occurred');
            }
            const result = await response.json();
            setData({
                error: false,
                news: result.data
            });
        } catch (error) {
            console.error(error);
            setData({
                error: true,
                news: []
            });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetchData();
    }

    return (
        <div className='global-container'>
            <form id='go-back' onSubmit={handleSubmit} action="">
                <input ref={inputRef} type="text" placeholder='What do you want to search...' />
                <button type='submit'>🔍</button>
            </form>

            <div className="infos">
                {data.news.map((element, index) => (
                    <div key={index} className="card">
                        <img src={element.photo_url} alt='NEWS_IMAGE' />
                        <div className="text">
                            <p>{element.title}</p>
                            <a style={{ textAlign: 'center' }} rel = "noreferrer" target = "_blank" href={element.link}>SEE MORE</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
