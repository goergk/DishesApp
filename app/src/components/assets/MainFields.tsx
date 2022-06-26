import React from 'react'
import { dishes } from '../data';
import { FormikErrors, FormikTouched } from 'formik';
import { Values } from '../types/types';

interface Props {
    resetValues: () => void;
    values: Values,
    errors: FormikErrors<Values>,
    touched: FormikTouched<Values>,
    handleChange:
    {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    }
}

const MainFields: React.FC<Props> = ({
    values,
    errors,
    touched,
    handleChange,
    resetValues
}) => {
    return (
        <>
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
                        className="shadow appearance-none border rounded sm:text-sm w-[18rem] sm:w-[90%] py-2 sm:py-[.58rem] px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded sm:text-sm w-[10.7rem] sm:w-[8.73rem] py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
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
                    className="shadow appearance-none border rounded sm:text-sm w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer"
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
        </>
    )
}

export default MainFields