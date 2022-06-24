import * as Yup from "yup";

/* Setting the initial values of the form. */
export const initialValues = {
    name: "",
    preparation_time: "00:00:00",
    type: "Select dish type",
    no_of_slices: "",
    diameter: "",
    spiciness_scale: 1,
    slices_of_bread: ""
};

/* Defining the validation rules for the form. */
export const FORM_VALIDATION = Yup.object().shape({
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