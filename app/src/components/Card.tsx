import React, { useState } from 'react';
import { dishes } from './data';
import { useFormik } from "formik";
import ResponseContainer from './assets/ResponseContainer';
import { FORM_VALIDATION, initialValues } from './validation/validation';
import AdditionalPizzaFields from './assets/AdditionalPizzaFields';
import AdditionalSoupFields from './assets/AdditionalSoupFields';
import AdditionalSandwichFields from './assets/AdditionalSandwichFields';
import ButtonsContainer from './assets/ButtonsContainer';
import MainFields from './assets/MainFields';
import FormHeader from './assets/FormHeader';

const Card = () => {

    const [returnedError, setReturnedError] = useState<string | undefined>(undefined);
    const [returnedData, setReturnedData] = useState(undefined);

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
                if (Object.keys(data).length === 1) { setReturnedError(data[Object.keys(data)[0]]); }
                else { setReturnedData(data); }
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

    return (
        <>
            {returnedData === undefined &&
                <form className='w-[35rem] h-[30rem] drop-shadow-lg rounded-lg bg-slate-100' onSubmit={handleSubmit}>
                    <FormHeader values={values} />
                    <div className="relative w-full h-[19.5rem] border-b-2 px-8 py-7">
                        <MainFields
                            handleChange={handleChange}
                            resetValues={resetValues}
                            values={values}
                            errors={errors}
                            touched={touched}
                        />
                        {values.type === dishes[0].value &&
                            <AdditionalPizzaFields
                                values={values}
                                handleChange={handleChange}
                                errors={errors}
                                touched={touched}
                            />
                        }
                        {values.type === dishes[1].value &&
                            <AdditionalSoupFields
                                values={values}
                                handleChange={handleChange}
                            />
                        }
                        {values.type === dishes[2].value &&
                            <AdditionalSandwichFields
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                            />
                        }
                        {returnedError && <p className="absolute bottom-[0%] text-red-500 text-xs font-sans font-light"><b>Returned validation error: </b>{returnedError}</p>}
                    </div>
                    <ButtonsContainer resetValues={resetValues} />
                </form>
            }
            {returnedData !== undefined &&
                <ResponseContainer
                    resetValues={resetValues}
                    setReturnedData={setReturnedData}
                    returnedData={returnedData}
                />
            }
        </>
    )
}

export default Card