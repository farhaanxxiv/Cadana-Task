import { useState, useContext, createContext } from 'react';

// Step 1: Create a Context
const SushiCountContext = createContext("light", () => "light");

// Step 2: Create a Provider Component
const SushiCountProvider = ({ children }) => {
    const [sushiA, setSushiA] = useState(0);
    const [sushiB, setSushiB] = useState(0);


    function incrementSushiA() {

        const currentSushi = sushiA
        const newCount = currentSushi + 1

        setSushiA(newCount)
    }


    function decrementSushiA() {

        const currentSushi = sushiA

        if (currentSushi != 0) {

            const newCount = currentSushi - 1
            setSushiA(newCount)

        }

    }

    function incrementSushiB() {

        const currentSushi = sushiB
        const newCount = currentSushi + 1

        setSushiB(newCount)
    }


    function decrementSushiB() {

        const currentSushi = sushiB

        if (currentSushi != 0) {

            const newCount = currentSushi - 1
            setSushiB(newCount)

        }

    }


    return (
        <SushiCountContext.Provider value={{ decrementSushiB, decrementSushiA, incrementSushiA, incrementSushiB, sushiA, sushiB }}>
            {children}
        </SushiCountContext.Provider>
    );
}

export { SushiCountContext, SushiCountProvider };