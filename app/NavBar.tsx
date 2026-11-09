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
    <nav className='flex space-x-8 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/">
            <Flex gap="2" align="center">
                <Text>UFC Fight Predictor</Text>
                <GiPunch size={35} />
            </Flex>
        </Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
                <Link 
                    className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
                    key={link.href} href={link.href}>{link.label}
                </Link>
            )}
        </ul>
    </nav>
  )
}

export default NavBar