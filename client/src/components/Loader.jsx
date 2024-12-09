import React from 'react'

function Loader() {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div class="relative">
                <div class="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
                <div
                    class="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-indigo-500 border-t-transparent">
                </div>
            </div>
        </div>
    )
}

export default Loader