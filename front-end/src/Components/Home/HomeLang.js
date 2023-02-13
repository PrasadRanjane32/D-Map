import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import skills from '../../Assets/Projects/skills.json'
import './HomeLang.css'


const HomeLang = () => {
    const [sname] = useState(skills);
    function refreshPage() {
        window.location.reload(false);
      }

    return (
        <>
            <section id="skills" className='skills tracks-section pt-40 md:pt-56 mb-40 md:mb-56'>
                <div className='lg-container'>
                    <div className='section-header items-center self-center mb-8 md:mb-12'>
                        {/* <div className="c-icon  --hex"><img role="presentation" alt="" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/tracks-2e780b460e113a9b07ce4446c988a31c40547b00.svg" /></div> */}
                        <h2 className='text-h1 text-center'>
                        <i className="fas fa-laptop-code"></i> Explore and
                            <strong> get fluent </strong>
                            in
                            <br />
                            programming languages
                        </h2>
                    </div>
                    <br/>
                    <hr/>
                    <br/>
                    <section className="skills" id="skills">

<div className="container">
    <div className="row" id="skillsContainer">
        {sname.map((curElem) => {
            const {  name, icon,link} = curElem;
            return (
                <>
                    <a href={curElem.link} target="_self">
                        <div className="bar">
                            <div className="info">
                            <img alt={name} src={icon} />
                            <div className='title'>{name}</div>
                            </div>
                        </div>
                    </a>
                </>
            )
        })}
    </div>
</div>
</section>



                        
                    <div  >
                        <Link className="cta c-prominent-link --with-bg " style={{"borderRadius":'30px 100px'}} to="/Toys"><span>See all Language Tracks</span><img role="presentation" alt="" className="c-icon" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/arrow-right-0f5e363467e0c55fe280b4864639a9c677afa0d2.svg" /></Link>
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeLang