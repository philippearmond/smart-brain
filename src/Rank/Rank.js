import React from 'react'

import './rank.css'

const Rank = ({ name, entries }) => (
    <div className="layout">
        <div className="white f3">
            { `${name}, sua classificação é Rank...` }
        </div>
        <div className="white f1">
            { `#${entries}` }
        </div>
    </div>
)

export default Rank