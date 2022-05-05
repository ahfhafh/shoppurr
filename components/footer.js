const Footer = (props) => {
    return (
        <footer className='text-center bg-background2 pt-8 pb-36'>
            <div className="m-4">
                <div className="my-4">Sign up for 15% off your first purchase:</div>
                <input className="border" type='email' placeholder="Email"></input>
                <button className="ring" type='submit'>yes</button>
            </div>
            <div>Powered by <a href="https://github.com/ahfhafh/shoppurr" className="underline">Github Repo</a></div>
        </footer>
    );
};

export default Footer;