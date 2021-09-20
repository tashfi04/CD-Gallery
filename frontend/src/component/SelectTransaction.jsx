import React, { useState } from 'react'

function SelectTransaction({selected, id, item_name, price}) {
    const [quantity, setQuantity] = useState(0)
    return (
        <div>
            <div className='flex'>
                <input
                    className='flex-1 mr-5 shadow-xl appearance-none border rounded w-full py-2
                                                            px-3 text-gray-700 leading-tight focus:outline-none
                                                            focus:shadow-outline'
                    name='count'
                    type='number'
                    placeholder='Quantity'
                    value={quantity}
                    onChange={e =>
                        setQuantity(e.target.value)
                    }
                    required
                />
                <button className='btn flex-1 ml-5' onClick={() => selected(id, item_name, price, quantity)}>
                    Select
                </button>
            </div>
        </div>
    )
}

export default SelectTransaction
