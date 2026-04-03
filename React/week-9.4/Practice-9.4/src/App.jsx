//8th TOPIC->>> CHILDREN     EXAMPLE

import {useEffect, useState} from 'react';

function App() {
    const [showTimer, setShowTimer] = useState(true);

    return <div>
        <Card innerContent={"Hii there"}/>
    </div>
}

function Card({innerContent}) {
    return <spam style={{background:"black", borderRadius: 10, color:"white", padding:10, margin:10}}>
        {innerContent}
    </spam> 
}

export default App