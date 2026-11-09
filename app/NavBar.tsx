'use client'

import { Flex, Text } from '@radix-ui/themes';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { GiPunch } from "react-icons/gi";

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { label: "Home", href: "/"},
        { label: "About", href: "/about"},
        { label: "Past Predictions", href: "/past-predictions"}
    ]
  return (
    <nav className='flex space-x-8 mb-5 px-5 h-14 items-center bg-red-700 border-b-3 border-b-black'>
        <Link href="/">
            <Flex gap="2" align="center">
                <Text className='text-white'>UFC Fight Predictor</Text>
                <GiPunch size={35} color='white' />
            </Flex>
        </Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
                <Link 
                    className={`${link.href === currentPath ? 'text-black' : 'text-white'} hover:text-zinc-800 transition-colors`}
                    key={link.href} href={link.href}>{link.label}
                </Link>
            )}
        </ul>
    </nav>
  )
}

export default NavBar