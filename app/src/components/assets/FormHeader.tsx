import React, { useEffect, useState } from 'react';
import { dishes } from '../data';
import { Values } from '../types/types';

interface Props {
    values: Values
}

const FormHeader: React.FC<Props> = ({ values }) => {

    const [headerBackground, setHeaderBackground] = useState('');

    /* Setting the background color of the header based on the dish type selected. */
    useEffect(() => {
        if (values.type === "Select dish type") { setHeaderBackground('bg-food') }
        else if (values.type === dishes[0].value) { setHeaderBackground('bg-pizza') }
        else if (values.type === dishes[1].value) { setHeaderBackground('bg-soup') }
        else if (values.type === dishes[2].value) { setHeaderBackground('bg-sandwich') }
    }, [values.type])

    return (
        <div className={`w-full h-[4rem] ${headerBackground} bg-center z-[-10] rounded-t-lg duration-200`} />
    )
}

export default FormHeader