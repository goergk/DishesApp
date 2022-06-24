import React, { useEffect, useState } from 'react';
import { dishes } from './data';
import * as Yup from "yup";
import { useFormik } from "formik";

/* Setting the initial values of the form. */
const initialValues = {
    name: "",
    time: "00:00:00",
    dishType: "Select dish type",
    noOfSlices: "",
    diameter: "",
    spiceness: 1,
    slicesOfBread: ""
};

/* Defining the validation rules for the form. */
const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
        .required("Required")
        .max(36, 'Max length is 36')
        .min(4, 'Min length is 4'),
    time: Yup.string()
        .required("Required")
        .min(4, 'Min length is 4')
        .max(16, 'Max length is 16')
        .test("time", "Required", function (value) {
            return value !== "00:00:00" || this.parent.time.required;
        }),
    dishType: Yup.string()
        .test("dishType", "Required", function (value) {
            return value !== "Select dish type" || this.parent.dishType.required;
        }),
    noOfSlices: Yup.number().when('dishType', {
        is: (dishType: string) => dishType === 'pizza',
        then: Yup.number().required('Required').max(36, 'Max value is 36').min(2, 'Min value is 2'),
        otherwise: Yup.number(),
    }),
    diameter: Yup.number().when('dishType', {
        is: (dishType: string) => dishType === 'pizza',
        then: Yup.number().required('Required').max(100.00, 'Max diameter is 100.00').min(5, 'Min diameter is 5.00'),
        otherwise: Yup.number(),
    }),
    slicesOfBread: Yup.number().when('dishType', {
        is: (dishType: string) => dishType === 'sandwich',
        then: Yup.number().required('Required').max(10, 'Max value is 10').min(2, 'Min value is 2'),
        otherwise: Yup.number(),
    }),

});

const Card = () => {

    const [rangeColor, setRangeColor] = useState<string>('text-red-600');
    const [headerBackground, setHeaderBackground] = useState<string>('');

    const onSubmit = () => { console.log("It works!") };

    /*ResetValues() is a function that resets the form values and errors.*/
    const resetValues = () => {
        resetForm({});
        setErrors({});
    }

    /* Using the useFormik hook to create a form. */
    const { handleChange, handleSubmit, resetForm, setErrors, values, errors, touched } = useFormik({
        initialValues,
        validationSchema: FORM_VALIDATION,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit,
    });

    /* Setting the color of the range slider based on the value of the slider. */
    useEffect(() => {
        if (values.spiceness === 1) { setRangeColor('text-blue-700') }
        else if (values.spiceness === 2) { setRangeColor('text-blue-400') }
        else if (values.spiceness === 3) { setRangeColor('text-blue-300') }
        else if (values.spiceness === 4) { setRangeColor('text-yellow-400') }
        else if (values.spiceness === 5) { setRangeColor('text-yellow-500') }
        else if (values.spiceness === 6) { setRangeColor('text-orange-400') }
        else if (values.spiceness === 7) { setRangeColor('text-orange-700') }
        else if (values.spiceness === 8) { setRangeColor('text-red-500') }
        else if (values.spiceness === 9) { setRangeColor('text-red-700') }
        else if (values.spiceness === 10) { setRangeColor('text-red-600') }

    }, [values.spiceness])

    /* Setting the background color of the header based on the dish type selected. */
    useEffect(() => {
        if (values.dishType === "Select dish type") { setHeaderBackground('bg-food') }
        else if (values.dishType === dishes[0].value) { setHeaderBackground('bg-pizza') }
        else if (values.dishType === dishes[1].value) { setHeaderBackground('bg-soup') }
        else if (values.dishType === dishes[2].value) { setHeaderBackground('bg-sandwich') }
    }, [values.dishType])

    return (
        <form className='w-[35rem] h-[30rem] drop-shadow-lg rounded-lg bg-slate-100' onSubmit={handleSubmit}>
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
                            value={values.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-[18rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {(errors.name && touched.name) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.name}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                            ⌚ Preparation time:
                        </label>
                        <input
                            id="time"
                            type="time"
                            step="2"
                            value={values.time}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-[10.7rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
                        />
                        {(errors.time && touched.time) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.time}</p>}
                    </div>
                </div>

                <div className="mb-6 mt-4">
                    <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                        👇 Dish type:
                    </label>
                    <select
                        id="dishType"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
                        value={values.dishType}
                        onChange={handleChange}
                    >
                        <option disabled hidden>Select dish type</option>
                        {dishes.map(dish => (
                            <option key={dish.id} value={dish.value}>{dish.desc}</option>
                        ))}
                    </select>
                    {(errors.dishType && touched.dishType) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.dishType}</p>}
                </div>

                {
                    values.dishType === dishes[0].value &&
                    <div className='flex flex-row justify-between'>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                                ☸️Number of slices:
                            </label>
                            <input
                                id="noOfSlices"
                                type="number"
                                value={values.noOfSlices}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-[14rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {(errors.noOfSlices && touched.noOfSlices) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.noOfSlices}</p>}
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                                📏Diameter:
                            </label>
                            <input
                                id="diameter"
                                type="number"
                                step="0.01"
                                value={values.diameter}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-[14rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {(errors.diameter && touched.diameter) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.diameter}</p>}
                        </div>
                    </div>
                }
                {
                    values.dishType === dishes[1].value &&
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                            🔥Spiceness level:
                        </label>
                        <input
                            id="spiceness"
                            type="range"
                            min="1"
                            max="10"
                            value={values.spiceness}
                            onChange={handleChange}
                            className="appearance-none shadow rounded-lg w-full text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <div className="flex justify-center items-center w-full mt-2">
                            <p className={`font-sans font-medium ${rangeColor}`}>
                                Level:
                            </p>
                            <span className={`font-sans ml-2 font-bold ${rangeColor}`}>
                                {values.spiceness}
                            </span>
                        </div>
                    </div>
                }
                {
                    values.dishType === dishes[2].value &&
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                            🍞Slices of bread:
                        </label>
                        <input
                            id="slicesOfBread"
                            type="number"
                            value={values.slicesOfBread}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {(errors.slicesOfBread && touched.slicesOfBread) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.slicesOfBread}</p>}
                    </div>
                }
            </div>
            <div className="flex justify-end items-end w-full h-[4.5rem] gap-6 px-8">
                <button type="submit" className="flex justify-center items-center gap-2 bg-transparent hover:bg-green-500 text-green-700 fill-green-700 font-semibold hover:text-white hover:fill-white w-[8rem] py-2 border border-green-500 hover:border-transparent rounded duration-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" /></svg>
                    <span>Submit</span>
                </button>
                <button type="button" onClick={resetValues} className="flex justify-center items-center gap-2 bg-transparent hover:bg-red-500 text-red-700 fill-red-700 font-semibold hover:text-white hover:fill-white w-[8rem] py-2 border border-red-500 hover:border-transparent rounded duration-100">
                    <svg width="24" height="24" className="scale-[0.85]" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z" /></svg>
                    <span>Reset</span>
                </button>
            </div>
        </form>
    )
}

export default Card