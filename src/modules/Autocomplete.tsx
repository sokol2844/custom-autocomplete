import React, { useEffect, useState, useRef, MouseEvent } from "react"
import { Field } from 'react-final-form'
import '../App.css'

export default function Autocomplete() {
    type Shows = Array<{ name: string}>
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState<Shows>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    function updateInput(value: string) {
        setSearch(value);
        setDisplay(false);
    }

    useEffect(() => {
        fetch('http://api.tvmaze.com/shows')
        .then((res: any) => {
            return res.json();
        })
        .then((res: Shows) => {
            setOptions(res);
        })
        .catch((err: any) => {
            console.log(err);
        })
      }, []);

    function handleClickOutside(event: any /*React.MouseEvent<EventTarget>*/) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target instanceof Node? event.target : null)) {
            setDisplay(false);
        }
    }


    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);
    
    return (
        <div ref={wrapperRef}>
            <h3>Custom Autocomplete</h3>
            <Field name="Autocomplete">
                {() => (
                    
                        <input
                            type="text"
                            onClick={() => setDisplay(!display)}
                            placeholder="Type to search"
                            value = {search}
                            onChange={event => setSearch(event.target.value)}
                            className = "auto-input"
                        />
                )}
            </Field>
            {display && (
                <div className="autoContainer">
                    {options
                        .filter(({name}) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                        .map((value, i) => {
                            return (
                                <div 
                                    className="option"
                                    key={i}
                                    onClick = {() => updateInput(value.name)}
                                >
                                    <span>{value.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
                )}
        </div>
    )
}