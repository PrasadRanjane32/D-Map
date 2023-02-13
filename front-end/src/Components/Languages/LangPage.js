import React, { useState } from 'react'
import allskills from '../../Assets/Projects/allSkills.json'


const LangPage = () => {
    
            const [sname, setSname] = useState(allskills);

            return (
            <>
                <section id="skills" className='skills tracks-section pt-40 md:pt-56 mb-40 md:mb-56'>
                    <div className='lg-container'>
                        <div className='section-header items-center self-center mb-8 md:mb-12'>
                            <h2 className='text-h1 text-center'>
                                Explore and
                                <strong> get fluent </strong>
                                in
                                <br />
                                programming languages
                            </h2>
                        </div>

                        <section className="skills" id="skills">
                            <div className="container">
                                <div className="row" id="skillsContainer">
                                    {sname.map((curElem) => {
                                        const { id, name, icon, link } = curElem;
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
                    </div>
                </section>
            </>
            )

}

export default LangPage