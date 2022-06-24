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

const AdditionalSandwichFields: React.FC<Props> = ({
    values,
    errors,
    touched,
    handleChange
}) => {
    return (
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
    )
}

export default AdditionalSandwichFields