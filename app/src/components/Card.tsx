import React, { useEffect, useState } from 'react';
import { dishes } from './data';
import * as Yup from "yup";
import { useFormik } from "formik";

/* Setting the initial values of the form. */
const initialValues = {
    name: "",
    preparation_time: "00:00:00",
    type: "Select dish type",
    no_of_slices: "",
    diameter: "",
    spiciness_scale: 1,
    slices_of_bread: ""
};

/* Defining the validation rules for the form. */
const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
        .required("Required")
        .max(36, 'Max length is 36')
        .min(4, 'Min length is 4'),
    preparation_time: Yup.string()
        .required("Required")
        .min(4, 'Min length is 4')
        .max(16, 'Max length is 16')
        .test("preparation_time", "Required", function (value) {
            return value !== "00:00:00" || this.parent.preparation_time.required;
        }),
    type: Yup.string()
        .test("type", "Required", function (value) {
            return value !== "Select dish type" || this.parent.type.required;
        }),
    no_of_slices: Yup.number()
        .when('type', {
            is: (type: string) => type === 'pizza',
            then: Yup.number().required('Required').max(36, 'Max value is 36').min(2, 'Min value is 2'),
            otherwise: Yup.number(),
        }),
    diameter: Yup.number()
        .when('type', {
            is: (type: string) => type === 'pizza',
            then: Yup.number().required('Required').max(100.00, 'Max diameter is 100.00').min(5, 'Min diameter is 5.00'),
            otherwise: Yup.number(),
        }),
    slices_of_bread: Yup.number()
        .when('type', {
            is: (type: string) => type === 'sandwich',
            then: Yup.number().required('Required').max(20, 'Max value is 20').min(2, 'Min value is 2'),
            otherwise: Yup.number(),
        }),

});

const Card = () => {

    const [rangeColor, setRangeColor] = useState<string>('text-red-600');
    const [headerBackground, setHeaderBackground] = useState<string>('');
    const [returnedError, setReturnedError] = useState<string | undefined>(undefined);
    const [returnedData, setReturnedData] = useState({});

    const onSubmit = () => {

        /* Creating an object called body and assigning it a properties. */
        let body: {
            name: string,
            preparation_time: string,
            type: string,
            no_of_slices: number | undefined,
            diameter: number | undefined,
            spiciness_scale: number | undefined,
            slices_of_bread: number | undefined
        } = {
            "name": values.name,
            "preparation_time": values.preparation_time,
            "type": values.type,
            "no_of_slices": undefined,
            "diameter": undefined,
            "spiciness_scale": undefined,
            "slices_of_bread": undefined
        }

        /* Checking the type of food and then adding the appropriate properties to the body object. */
        if (values.type === 'pizza') {
            body['no_of_slices'] = Number(values.no_of_slices);
            body['diameter'] = Number(values.diameter);
        }

        if (values.type === 'soup') {
            body['spiciness_scale'] = Number(values.spiciness_scale);
        }

        if (values.type === 'sandwich') {
            body['slices_of_bread'] = Number(values.slices_of_bread);
        }

        /* Sending a POST request to the server. */
        fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                /* Returned validation errors support */
                if (Object.keys(data).length === 1) {
                    setReturnedError(data[Object.keys(data)[0]]);
                }
                else {
                    setReturnedData(data);
                }
            })
    };

    /*ResetValues() is a function that resets the form values and errors.*/
    const resetValues = () => {
        resetForm({});
        setErrors({});
        setReturnedError(undefined);
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
        if (values.spiciness_scale === 1) { setRangeColor('text-blue-700') }
        else if (values.spiciness_scale === 2) { setRangeColor('text-blue-400') }
        else if (values.spiciness_scale === 3) { setRangeColor('text-blue-300') }
        else if (values.spiciness_scale === 4) { setRangeColor('text-yellow-400') }
        else if (values.spiciness_scale === 5) { setRangeColor('text-yellow-500') }
        else if (values.spiciness_scale === 6) { setRangeColor('text-orange-400') }
        else if (values.spiciness_scale === 7) { setRangeColor('text-orange-700') }
        else if (values.spiciness_scale === 8) { setRangeColor('text-red-500') }
        else if (values.spiciness_scale === 9) { setRangeColor('text-red-700') }
        else if (values.spiciness_scale === 10) { setRangeColor('text-red-600') }

    }, [values.spiciness_scale])

    /* Setting the background color of the header based on the dish type selected. */
    useEffect(() => {
        if (values.type === "Select dish type") { setHeaderBackground('bg-food') }
        else if (values.type === dishes[0].value) { setHeaderBackground('bg-pizza') }
        else if (values.type === dishes[1].value) { setHeaderBackground('bg-soup') }
        else if (values.type === dishes[2].value) { setHeaderBackground('bg-sandwich') }
    }, [values.type])

    return (
        <form className='w-[35rem] h-[30rem] drop-shadow-lg rounded-lg bg-slate-100' onSubmit={handleSubmit}>
            <div className={`w-full h-[4rem] ${headerBackground} bg-center z-[-10] rounded-t-lg duration-200`} />
            <div className="relative w-full h-[19.5rem] border-b-2 px-8 py-7">
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
                            id="preparation_time"
                            type="time"
                            step="2"
                            value={values.preparation_time}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-[10.7rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
                        />
                        {(errors.preparation_time && touched.preparation_time) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.preparation_time}</p>}
                    </div>
                </div>

                <div className="mb-6 mt-4">
                    <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                        👇 Dish type:
                    </label>
                    <select
                        id="type"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
                        value={values.type}
                        onChange={handleChange}
                    >
                        <option disabled hidden>Select dish type</option>
                        {dishes.map(dish => (
                            <option key={dish.id} value={dish.value}>{dish.desc}</option>
                        ))}
                    </select>
                    {(errors.type && touched.type) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.type}</p>}
                </div>

                {
                    values.type === dishes[0].value &&
                    <div className='flex flex-row justify-between'>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                                ☸️Number of slices:
                            </label>
                            <input
                                id="no_of_slices"
                                type="number"
                                value={values.no_of_slices}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-[14rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {(errors.no_of_slices && touched.no_of_slices) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.no_of_slices}</p>}
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
                    values.type === dishes[1].value &&
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                            🔥Spiceness level:
                        </label>
                        <input
                            id="spiciness_scale"
                            type="range"
                            min="1"
                            max="10"
                            value={values.spiciness_scale}
                            onChange={handleChange}
                            className="appearance-none shadow rounded-lg w-full text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <div className="flex justify-center items-center w-full mt-2">
                            <p className={`font-sans font-medium ${rangeColor}`}>
                                Level:
                            </p>
                            <span className={`font-sans ml-2 font-bold ${rangeColor}`}>
                                {values.spiciness_scale}
                            </span>
                        </div>
                    </div>
                }
                {
                    values.type === dishes[2].value &&
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-sans font-medium mb-2">
                            🍞Slices of bread:
                        </label>
                        <input
                            id="slices_of_bread"
                            type="number"
                            value={values.slices_of_bread}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {(errors.slices_of_bread && touched.slices_of_bread) && <p className="absolute text-red-500 text-xs mt-1 font-sans font-light">{errors.slices_of_bread}</p>}
                    </div>
                }
                {returnedError && <p className="absolute bottom-[0%] text-red-500 text-xs font-sans font-light"><b>Returned validation error: </b>{returnedError}</p>}
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