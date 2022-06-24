import React, { useEffect, useState } from 'react'

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
    handleChange:
    {
        (e: React.ChangeEvent<any>): void;
        <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    }
}

const AdditionalSoupFields: React.FC<Props> = ({
    values,
    handleChange
}) => {

    const [rangeColor, setRangeColor] = useState<string>('text-red-600');

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

    return (
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
    )
}

export default AdditionalSoupFields