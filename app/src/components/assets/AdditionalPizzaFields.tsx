import React from 'react';
import { FormikErrors, FormikTouched } from 'formik';

interface Props {
    values: {
        name: string;
        preparation_time: string;
        type: string;
        no_of_slices: string;
        diameter: string;
        spiciness_scale: number;
        slices_of_bread: string;
    },
    errors: FormikErrors<{
        name: string;
        preparation_time: string;
        type: string;
        no_of_slices: string;
        diameter: string;
        spiciness_scale: number;
        slices_of_bread: string;
    }>,
    touched: FormikTouched<{
        name: string;
        preparation_time: string;
        type: string;
        no_of_slices: string;
        diameter: string;
        spiciness_scale: number;
        slices_of_bread: string;
    }>,
    handleChange:
    {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    }
}

const AdditionalPizzaFields: React.FC<Props> = ({
    values,
    errors,
    touched,
    handleChange
}) => {
    return (
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
    )
}

export default AdditionalPizzaFields