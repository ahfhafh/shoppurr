import { motion } from 'framer-motion';
import Link from 'next/link';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch(
    'X2LCL3RPHJ',
    '85bdea86205ff981a1717a06f5499dda'
);

function Hit({ hit }) {
    return (
        <div>
            <Link href={`/${hit.path}`}><a>{hit.Name}</a></Link>
        </div>
    );
}

const Search = (props) => {
    return (
        <motion.div
            key="search"
            className="fixed w-full h-full left-0 bg-slate-500 z-40"
            animate={{ backgroundColor: 'rgba(50, 50, 50, 0.75)', backdropFilter: "blur(8px)" }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: "blur(0px)" }}
        >
            <motion.div className="w-3/4 md:w-1/2 mx-auto mt-[10%]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <InstantSearch indexName="dev_Foods" searchClient={searchClient}>
                    <SearchBox classNames={{ form: 'flex', input: 'text-xl py-1 pl-2 rounded-md grow', submit: 'ml-2', submitIcon: 'w-[24px] h-[24px] translate-y-1' }} />
                    <Hits hitComponent={Hit} classNames={{ list: 'bg-background2 rounded-md mt-2 p-4', item: 'border-t first:border-none py-2' }} />
                </InstantSearch>
            </motion.div>
            <motion.button className="text-xl absolute top-8 right-8 p-2 hover:border" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => props.toggleSearch()}>X</motion.button>
        </motion.div>
    );
};

export default Search;

// TODO: search general
// TODO: close search after
// TODO: search multiple collections