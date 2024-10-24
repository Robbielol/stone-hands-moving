import "./services.css"
import localImg from "../../Pictures/localDistImg.jpg"
import longDistImg from "../../Pictures/longDistImg.jpg"
import packImg from "../../Pictures/PackImg.jpg"
import storageImg from "../../Pictures/storageImg.jpg"
import junkImg from "../../Pictures/junkImg.jpg"
import specialtyImg from "../../Pictures/specialtyImg.jpg"

const SingleService = ({title, description, image}) => {
    return (
        <div className="service-card">
            <img loading='lazy' src={image} alt={title} className="service-image" />
            <h3 className="service-title">{title}</h3>
            <p className="service-description">
                {description}
            </p>
        </div>
    );
}

function ServicesSection(){
    let localMovingDesc = 'Whether you are moving down the street or across Metro-Vancouver, we handle all types of accomodation sizes. Our moving services are efficient, safe, and affordable. Providing this service to West Vancouver to Surrey and every city in between';
    let longDistanceDesc = 'Moving across the province or country? We provide seamless long-distance moving solutions tailored to your needs and your accomodation. Operating to all cities in British Colombia, Whistler, Victoria and all cities in the Oakanagan area.';
    let packingServicesDesc = 'Save time and effort with our professional packing services. We carefully pack, organize and transport all of your belongings with the highest stardard of care to all your items, delicate and durable.';
    let storageSolutionsDesc = 'Not sure where you want to move or have too much furniture? We offer secure, climate-controlled storage facilities to keep your items safe until you\'re ready.';
    let junkRemovalDesc = 'Our team has the experience and knowledge in clearing out your clutter and trash in a swift and diligent manner. Giving you plenty of room and air to breath in.';
    let specialtyItemDesc = 'We handle the transport of specialty items like pianos, antiques, artwork, and other valuables with utmost care. Ensuring your valued items arrive exactly how and where you want them.';
    
    return (
        <div className="Section">
            <div className="services-container">
                <h2 className="services-heading">Our Services</h2>
                <div className="services-grid">
                    <SingleService title='Local Moving' description={localMovingDesc} image={localImg}/>
                    <SingleService title='Long-Distance Moving' description={longDistanceDesc} image={longDistImg} />
                    <SingleService title='Packing Services' description={packingServicesDesc} image={packImg} />
                    <SingleService title='Storage Solutions' description={storageSolutionsDesc} image={storageImg} />
                    <SingleService title='Junk Removal' description={junkRemovalDesc} image={junkImg} />
                    <SingleService title='Specialty Item Moving' description={specialtyItemDesc} image={specialtyImg} />                        
                </div>
            </div>
        </div>
    );
}

export default ServicesSection;