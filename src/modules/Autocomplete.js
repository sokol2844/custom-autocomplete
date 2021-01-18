import React, { useEffect, useState, useRef } from "react"
import { Field } from 'react-final-form'
import '../App.css'

export default function Autocomplete(props) {
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    const updateInput = value => {
        setSearch(value);
        setDisplay(false);
    }

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (!wrap.contains(event.target)) {
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
                    {props.options
                        .filter(({label}) => label.toLowerCase().indexOf(search.toLowerCase()) > -1)
                        .map((value, i) => {
                            return (
                                <div 
                                    className="option"
                                    key={i}
                                    tabIndex="0"
                                    onClick = {() => updateInput(value.label)}
                                >
                                    <span>{value.label}</span>
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}