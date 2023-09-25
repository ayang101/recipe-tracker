import homeImage from './images/home-image.jpg';
import './App.css';


const GuestHome = () => {
    return (
        <>
            <main>
                <section
                    className="first-section"
                    style={{ backgroundImage: `url("${homeImage}")`,
                             backgroundPosition: 'left',
                             backgroundRepeat: 'no-repeat',
                             backgroundSize: '100%',
                             height: 500 }} >
                    <div className='caption'>
                        <h2>Plan your day,<br />one meal at a time.</h2>
                        <p className='text-segment'>
                            it's FREE!
                        </p>
                    </div>
                </section>
                <section className="second-section">
                    <div>
                        <h3 className='caption'>It's as easy as:</h3>
                        <div id='cook-container' className='content'>
                            <h4 className='text-segment'>1. Cook</h4>
                            <p className='text-segment'>
                                Import your recipes on the go.<br />
                                Easily view saved recipes with our simple, tabular layouts.
                            </p>
                        </div>
                        <div id='plan-container' className='content'>
                            <h4 className='text-segment'>2. Plan</h4>
                            <p className='text-segment'>
                                Plan and categorize your weekly meals using our user-friendly calender.<br />
                                Form meals with a combination of recipes and ingredients.
                            </p>
                        </div>
                        <div id='shop-container' className='content'>
                            <h4 className='text-segment'>3. Shop</h4>
                            <p className='text-segment'>
                                Create multiple shopping lists for separate occasions.<br />
                                Add new items to any shopping list and<br />
                                view all items of each and every list at once.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className='footer'>
                <div className="copyright">&copy; Anna Yang</div>
                <div className="footer-links">
                    <div className="links" style={{float: "right", margin: 0, padding: 0}}>
                        <a href="https://github.com/ayang101/recipe-tracker">GitHub</a>&emsp;
                        <a href="mailto:yangxanna958@gmail.com? subject=subject text">Email</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default GuestHome;