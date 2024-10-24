import './aboutSection.css';
import '../Contact/contactForm.css';
import mockPicture from "../../Pictures/mock-picture-2.jpg"

function AboutSection(){
    return(
        <div className="section-container">
            <h2 className="section-title">All About Stonehands Moving </h2>
            <div className="content-container">
                <img src={mockPicture} alt='stonehands moving team' className="section-image"/>
                <div className="section-text">
                    <p>
                        Founded in 2023, we have built an excellent reputation for delivering top-tier moving services throughout 
                        British Columbia. With years of experience in the industry, we are known for our professionalism, reliability, 
                        and dedication to making every move seamless and stress-free. <br/>Our team of experts is committed to providing 
                        personalized service, whether you’re moving locally or long-distance. Based out of Vancouver, we proudly serve 
                        all cities in inner British Columbia, the lower mainland and Vancouver Island, so Victoria to Vancouver to Vernon and everything inbetween.
                        Ensuring that your belongings are handled with the utmost care every step of the way. 
                        Choose us for a smooth and trustworthy moving experience! If you don't believe us check out our reviews on google or here.       
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutSection;