import { motion } from 'framer-motion';

const Search = (props) => {
    return (
        <motion.div
            key="search"
            className="fixed w-full h-full bg-slate-500 z-40"
            animate={{ backgroundColor: 'rgba(50, 50, 50, 0.75)', backdropFilter: "blur(8px)" }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: "blur(0px)" }}
        >
            <motion.div className="w-3/4 md:w-1/2 mx-auto mt-[25%] flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <input className='grow text-xl py-1 pl-2' type="text" placeholder="Search..."></input>
                <button className="text-2xl font-bold ml-4">{`>`}</button>
            </motion.div>
            <motion.button className="text-xl absolute top-8 right-8 p-2 hover:border" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => props.toggleSearch()}>X</motion.button>
        </motion.div>
    );
};

export default Search;