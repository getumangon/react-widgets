import React, { useState } from "react";
import data from '../data/items';

function Accordion({ }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const renderItems = data.map((e, index) => {
        return <React.Fragment key={e.title}>
            <div 
            className={(activeIndex != index) ? "title" : "title active"}
            onClick={() => setActiveIndex(index)}
            >
                <i className="dropdown icon"></i>
                {e.title}
            </div>
            <div className={(activeIndex != index) ? "content" : "content active"}>
                {e.content}
            </div>

        </React.Fragment>
    })

    return (
        <div className="ui styled accordion">
            {renderItems}
        </div>
    );
}

export default Accordion;
