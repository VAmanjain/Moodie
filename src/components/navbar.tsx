import { Damion } from 'next/font/google';
import Link from 'next/link';

const damion = Damion({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-damion',
});

const Navbar = () => {
    return (
        <nav className={` ${damion.className}` + " w-full h-50px  text-black p-4 flex justify-between items-center py-5 fixed top-0 left-0 backdrop-blur z-50"}>
            <h1 className="text-5xl font-bold mx-auto">
                <Link href="/" >
                    Moodie
                </Link>

                </h1>
            <Link href="/admin" className="text-2xl font-bold text-teal-600">
                Admin    
            </Link>
        </nav>
    );
};

export default Navbar;
