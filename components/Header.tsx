"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import amazonLogo from "../public/amazon-logo-2.webp";
import { BiCart } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';
import { supabase } from '@/lib/supabase/products';

const itemList = [
    "All",
    "Fresh",
    "Amazon miniTV",
    "Sell",
    "Gift Cards",
    "Baby",
    "Buy Again",
    "Browsing History",
    "Amazon Pay",
    "Gift Ideas",
    "Health, Household & Personal Care"
]

const Header = () => {
    const [query, setQuery] = useState<string>("");
    const [user, setUser] = useState<any>(null);
    const router = useRouter();


    const cart = useAppSelector(getCart);

    const searchHandler = () => {
        router.push(`/search/${query}`);
    }

    useEffect(()=>{
        const getUserData = async () => {
            const {data:{user}} = await supabase.auth.getUser();
            setUser(user);
        }
        getUserData();
    },[])
 
    return (
        <>
            <div className='bg-[#131921] text-white py-1'>
                <div className='flex items-center justify-between w-[90%] mx-auto'>
                    <Link href={'/'} className='w-[10%]'>
                        <Image src={amazonLogo} alt={"logo"} width={150} height={150} />
                    </Link>
                    <div className='flex items-center w-[60%]'>
                        <input 
                        value={query} 
                        onChange={(e)=>setQuery(e.target.value)}
                        type="text" 
                        className='w-full p-2 rounded-l-md outline-none text-black' placeholder='Search Amazon.in' />
                        <div 
                        onClick={searchHandler}
                        className='bg-[#FEBD69] p-2 cursor-pointer hover:bg-[#ffad43]   rounded-r-md'>
                            <CgSearch size={"24px"} className='text-black' />
                        </div>
                    </div>
                    <div className='flex items-center justify-around w-[20%]'>
                        <div onClick={()=>{
                            router.push("/signin")
                        }} className='cursor-pointer'>
                            <h1 className='text-xs hover:underline'>{`${user ? user?.identities[0]?.identity_data.full_name:"Signin"}`}</h1>
                            <h1 className='font-medium text-sm'>Account & Lists</h1>
                        </div>
                        <div>
                            <p className='text-xs'>Returns</p>
                            <h1 className='font-medium text-sm'>& Orders</h1>
                        </div>
                        <Link href={"/cart"}  className='cursor-pointer'>
                            <p className='relative top-3 left-5'>{cart.length}</p>
                            <div className='flex'>
                                <div>
                                    <BiCart size={"40px"} />
                                </div>
                                <h1 className='mt-4'>cart</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-[#232F3E] w-full text-white p-2  flex justify-between items-center'>
                <div>
                    {
                        itemList.map((link, idx) => {
                            return (
                                <Link key={idx} href={`/${link}`} className='mx-2 hover:border border border-transparent hover:border-white p-2'>
                                    {link}
                                </Link>
                            )
                        })
                    }

                </div>
                <div className='mr-5'>
                    <h1 onClick={ async ()=>{
                        const {error} = await supabase.auth.signOut();
                        router.push("/signin");
                    }} className='text-[#FEBD69] font-bold cursor-pointer hover:underline' >Sign out</h1>
                </div>
            </div>

        </>
    )
}

export default Header