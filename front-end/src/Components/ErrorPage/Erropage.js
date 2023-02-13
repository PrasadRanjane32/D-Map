import React from 'react'
import { Link } from 'react-router-dom'
import './Erropage.css'

const Erropage = () => {
    return (
        <>
            <div id='notfound'>
                <div className='notfound'>
                    <div className=' four_zero_four_bg'>
                        <h1>404</h1>
                    </div>
                    <h2>Oops! You seem to be lost.</h2>
                    <p className='m-5'>The page you are looking for might been removed,
                        had it's name changed or is temporarily Unavailable.
                    </p>
                    <Link to='/'>Home</Link>
                </div>
            </div>



            {/* <section className="page_404">
                
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-12 col-sm-offset-1 text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-enetr">404</h1>

                                </div>
                                <div className="contant_box_404">
                                    <h3 className="h2">
                                        Look like you're lost
                                    </h3>
                                    <p>
                                        the page you are looking for not available
                                    </p>
                                    <Link to='/'>Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>

          

            </section> */}
        </>
    )
}

export default Erropage