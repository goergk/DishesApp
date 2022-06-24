import React from 'react'
import BackIcon from '../icons/BackIcon';

interface Props {
    resetValues: () => void,
    setReturnedData: React.Dispatch<React.SetStateAction<undefined>>,
    returnedData: never
}

const ResponseContainer: React.FC<Props> = ({
    resetValues,
    setReturnedData,
    returnedData
}) => {
    return (
        <div className="flex flex-col justify-end w-[35rem] h-[30rem] drop-shadow-lg rounded-lg bg-slate-100 py-12 px-8">
            <button
                onClick={e => { resetValues(); setReturnedData(undefined); }}
                type="button"
                className="absolute top-0 mt-8 flex w-fit gap-2 hover:fill-blue-800 hover:text-blue-900 hover:underline duration-100"
            >
                <BackIcon />
                <span>Go back</span>
            </button>
            <p className="font-sans font-medium text-xl mb-4">
                Returned response:
            </p>
            <div className="flex flex-col justify-center w-full h-[18rem] bg-slate-800 rounded-md px-6 py-6 font-inconsolata">
                <span className="text-pink-400">&#123;</span>
                {Object.keys(returnedData!).map((key) => {
                    return <span className="pl-6 text-cyan-400" key={key}>{key}: {returnedData![key]}</span>
                })}
                <span className="text-pink-400">&#125;</span>
            </div>
        </div>
    )
}

export default ResponseContainer