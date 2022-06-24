import React from 'react';
import BinIcon from '../icons/BinIcon';
import SubmitIcon from '../icons/SubmitIcon';

interface Props {
    resetValues: () => void;
}

const ButtonsContainer: React.FC<Props> = ({ resetValues }) => {
    return (
        <div className="flex justify-end items-end w-full h-[4.5rem] gap-6 px-8">
            <button type="submit" className="flex justify-center items-center gap-2 bg-transparent hover:bg-green-600 text-green-800 fill-green-800 font-semibold hover:text-white hover:fill-white w-[8rem] py-2 border border-green-500 hover:border-transparent rounded duration-100">
                <SubmitIcon />
                <span>Submit</span>
            </button>
            <button type="button" onClick={resetValues} className="flex justify-center items-center gap-2 bg-transparent hover:bg-red-500 text-red-700 fill-red-700 font-semibold hover:text-white hover:fill-white w-[8rem] py-2 border border-red-500 hover:border-transparent rounded duration-100">
                <BinIcon />
                <span>Reset</span>
            </button>
        </div>
    )
}

export default ButtonsContainer