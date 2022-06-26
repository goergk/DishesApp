export type Values = {
    name: string;
    preparation_time: string;
    type: string;
    no_of_slices: string;
    diameter: string;
    spiciness_scale: number;
    slices_of_bread: string;
}

export type ReturnedData = {
    name: string,
    preparation_time: string,
    type: string,
    no_of_slices: number | undefined,
    diameter: number | undefined,
    spiciness_scale: number | undefined,
    slices_of_bread: number | undefined
} | undefined

