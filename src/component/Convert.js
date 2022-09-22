import axios from "axios";
import React, { useEffect, useState } from "react";

function Convert({ language, text }) {
    const [debounceText, setDebounceText] = useState("");
    const [output, setOutput] = useState("")

    useEffect(() => {
        const doTranslation = async () => {
            const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debounceText,
                    target: language.value,
                    key: '<YOUR GOOGLE API KEY>'
                }
            });

            setOutput(data.data.translations[0].translatedText);
        }

        doTranslation();
    }, [language, debounceText])

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceText(text);
        }, 500);

        return () => {
            clearTimeout(timerId);
        }
    }, [text])


    return (
        <div>
            <h1 className="ui header">{output}</h1>
        </div>
    );
}

export default Convert;
