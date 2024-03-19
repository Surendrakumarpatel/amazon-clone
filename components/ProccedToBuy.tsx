import React from 'react'
import Subtotal from './shared/Subtotal';
import { useRouter } from 'next/navigation';

const ProccedToBuy = ({ length, totalPrice }: { length: number, totalPrice: number }) => {
    const router = useRouter();
    return (
        <div className='w-[20%] h-fit border border-gray-300 ml-4'>
            <div className='p-4 text-sm'>
                <p><span className='text-[#007600] font-medium'> Your order is eligible for FREE Delivery.</span> Choose FREE Delivery option at checkout.</p>
                <Subtotal left={true} length={length} totalPrice={totalPrice} />

                <button onClick={() => {
                    router.push("/checkout")
                }} className='bg-[#FFD814] w-full py-1 rounded-md shadow-md my-3'>Procced to Buy</button>
            </div>
        </div>
    )
}

export default ProccedToBuy