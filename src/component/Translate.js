import React, { useState } from "react";
import Convert from "./Convert";
import DropDown from "./DropDown";
import SearchWikipedia from "./SearchWikipedia";


const options = [
    {
        label: "Afrikaans",
        value: "af",
    },
    {
        label: "Arabic",
        value: "ar",
    },
    {
        label: "Hindi",
        value: "hi",
    },
    {
        label: "Gujarati",
        value: "gu",
    },
];

function Translate() {
    const [selected, setSelected] = useState(options[0]);
    const [text, setText] = useState("")
    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text</label>
                    <input onChange={(e) => setText(e.target.value)} value={text} />
                </div>
            </div>
            <DropDown
                selected={selected}
                onSelectedChange={setSelected}
                options={options}
            />
            <div className="ui header">OUTPUT: </div>
            <Convert language={selected} text={text}/>
        </div>
    );
}

export default Translate;
