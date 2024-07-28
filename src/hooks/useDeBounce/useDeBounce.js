import { useState, useEffect } from 'react';

export default function useDeBounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(null)
    
    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay)
        return () => clearTimeout(handler)
    })

    return debounceValue
}