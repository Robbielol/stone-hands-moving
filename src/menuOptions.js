
const MenuOptions = ({scrollIntoView}) => {

    return(
        <>
            <div className="menu-item">
                <button onClick={() => {scrollIntoView("homeSection");}}>HOME</button>
            </div>
            <div className="menu-item">
                <button onClick={() => {scrollIntoView("aboutSection");}}>ABOUT</button>
            </div>
            <div className="menu-item">
                <button onClick={() => {scrollIntoView("servicesSection");}}>SERVICES</button>
            </div>
            <div className="menu-item">
                <button onClick={() => {scrollIntoView("reviewsSection");}}>REVIEWS</button>
            </div>
            <div className="menu-item">
                <button onClick={() => {scrollIntoView("contactSection");}}>CONTACT</button>
            </div>
        </>
    );
};

export default MenuOptions;