import React, { useEffect, useState } from 'react';
import { dishes } from './data';

const Card = () => {

    const [dishType, setDishType] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string>('');
    const [time, setTime] = useState<string>('00:00:00');
    const [noOfSlices, setNoOfSlices] = useState<number | undefined>();
    const [diameter, setDiameter] = useState<number | undefined>();
    const [spiceness, setSpiceness] = useState<number>(1);
    const [slicesOfBread, setSlicesOfBread] = useState<number | undefined>();

    const [rangeColor, setRangeColor] = useState<string>('text-red-600');
    const [headerBackground, setHeaderBackground] = useState<string>('');

    useEffect(() => {
        if (spiceness === 1) { setRangeColor('text-blue-700') }
        else if (spiceness === 2) { setRangeColor('text-blue-400') }
        else if (spiceness === 3) { setRangeColor('text-blue-300') }
        else if (spiceness === 4) { setRangeColor('text-yellow-400') }
        else if (spiceness === 5) { setRangeColor('text-yellow-500') }
        else if (spiceness === 6) { setRangeColor('text-orange-400') }
        else if (spiceness === 7) { setRangeColor('text-orange-700') }
        else if (spiceness === 8) { setRangeColor('text-red-500') }
        else if (spiceness === 9) { setRangeColor('text-red-700') }
        else if (spiceness === 10) { setRangeColor('text-red-600') }

    }, [spiceness])

    useEffect(() => {
        if (dishType === undefined) { setHeaderBackground('bg-food') }
        else if (dishType === dishes[0].value) { setHeaderBackground('bg-pizza') }
        else if (dishType === dishes[1].value) { setHeaderBackground('bg-soup') }
        else if (dishType === dishes[2].value) { setHeaderBackground('bg-sandwich') }
    }, [dishType])

    return (
        <div className='w-[35rem] h-[30rem] drop-shadow-lg rounded-lg bg-slate-100'>
            <div className={`w-full h-[4rem] ${headerBackground} bg-center z-[-10] rounded-t-lg duration-200`} />
            <div className="w-full h-[19.5rem] border-b-2 px-8 py-7">
                <div className='flex flex-row justify-between'>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                            📘 Name:
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder='Type name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-[18rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {/* <p className="text-red-500 text-xs mt-1 font-sans font-light">Field required.</p> */}
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                            ⌚ Preparation time:
                        </label>
                        <input
                            id="time"
                            type="time"
                            step="2"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                            className="shadow appearance-none border rounded w-[10.7rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
                        />
                    </div>
                </div>

                <div className="mb-4 mt-4">
                    <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                        👇 Dish type:
                    </label>
                    <select
                        id="dishes"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
                        defaultValue='Select dish type'
                        value={dishType}
                        onChange={e => setDishType(e.target.value)}
                    >
                        <option disabled hidden>Select dish type</option>
                        {dishes.map(dish => (
                            <option key={dish.id} value={dish.value}>{dish.desc}</option>
                        ))}
                    </select>
                </div>

                {
                    dishType === dishes[0].value &&
                    <div className='flex flex-row justify-between'>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                                ☸️Number of slices:
                            </label>
                            <input
                                id="noOfSlices"
                                type="number"
                                min="2"
                                max="36"
                                value={noOfSlices}
                                onChange={(e) => setNoOfSlices(Number(e.target.value))}
                                className="shadow appearance-none border rounded w-[14rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {/* <p className="text-red-500 text-xs mt-1 font-sans font-light">Field required.</p> */}
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                                📏Diameter:
                            </label>
                            <input
                                id="diameter"
                                type="number"
                                step="0.01"
                                min="5.00"
                                max="100.00"
                                value={diameter}
                                onChange={(e) => setDiameter(Number(e.target.value))}
                                className="shadow appearance-none border rounded w-[14rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {/* <p className="text-red-500 text-xs mt-1 font-sans font-light">Field required.</p> */}
                        </div>
                    </div>
                }
                {
                    dishType === dishes[1].value &&
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                            🔥Spiceness level:
                        </label>
                        <input
                            id="spiceness"
                            type="range"
                            min="1"
                            max="10"
                            value={spiceness}
                            onChange={(e) => setSpiceness(Number(e.target.value))}
                            className="appearance-none shadow rounded-lg w-full text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <div className="flex justify-center items-center w-full mt-2">
                            <p className={`font-sans font-medium ${rangeColor}`}>
                                Level:
                            </p>
                            <span className={`font-sans ml-2 font-bold ${rangeColor}`}>
                                {spiceness}
                            </span>
                        </div>
                    </div>
                }
                {
                    dishType === dishes[2].value &&
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                            🍞Slices of bread:
                        </label>
                        <input
                            id="noOfSlices"
                            type="number"
                            min="2"
                            max="10"
                            value={slicesOfBread}
                            onChange={(e) => setSlicesOfBread(Number(e.target.value))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {/* <p className="text-red-500 text-xs mt-1 font-sans font-light">Field required.</p> */}
                    </div>
                }
            </div>
            <div className="flex justify-end items-end w-full h-[4.5rem] gap-6 px-8">
                <button className="flex justify-center items-center gap-2 bg-transparent hover:bg-green-500 text-green-700 fill-green-700 font-semibold hover:text-white hover:fill-white w-[8rem] py-2 border border-green-500 hover:border-transparent rounded duration-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" /></svg>
                    <span>Submit</span>
                </button>
                <button className="flex justify-center items-center gap-2 bg-transparent hover:bg-red-500 text-red-700 fill-red-700 font-semibold hover:text-white hover:fill-white w-[8rem] py-2 border border-red-500 hover:border-transparent rounded duration-100">
                    <svg width="24" height="24" className="scale-[0.85]" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z" /></svg>
                    <span>Reset</span>
                </button>
            </div>

        </div>
    )
}

export default Card