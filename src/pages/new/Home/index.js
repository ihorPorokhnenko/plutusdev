import React, {useRef} from "react";

/**
 * Style
 */
import '../../../assets/scss/app-new.css';

/**
 * Layout components
 */
import Navbar from "../../../Components/new/NavBar";
import Footer from '../../../Components/new/Footer';

/**
 *
 */
import ArticleImage1 from "../../../assetsDemo/blog-article1.jpg";
import ArticleImage2 from "../../../assetsDemo/blog-article2.jpg";
import ArticleImage3 from "../../../assetsDemo/blog-article3.jpg";
import ArticleImage4 from "../../../assetsDemo/blog-article4.jpg";
import ArticleImage5 from "../../../assetsDemo/blog-article5.jpg";
import ArticleImage6 from "../../../assetsDemo/blog-article6.jpg";
import authorProfileIcon from "../../../assetsDemo/blog-user-avatar.png";
import IconArrowRight from "../../../assets/images/icoin-arrow-right.svg";

/**
 *
 * @param match
 * @returns {JSX.Element}
 * @constructor
 */
export default function Index() {
    const footerRef = useRef(null);

    const articlesList = [
        {
            title: 'Selling your home? NFT your house & access on untapped buyer Pool!',
            image: ArticleImage1,
            date: '25 Apr 2022',
            category: 'Plutus News',
            user: {
                name: 'Naveed Shabbir',
                avatar: authorProfileIcon
            }
        },
        {
            title: 'Make a  blockchain history - Own the first multi million $ real estate...',
            image: ArticleImage2,
            date: '25 Apr 2022',
            category: 'Plutus News',
            user: {
                name: 'Naveed Shabbir',
                avatar: authorProfileIcon
            }
        },
        {
            title: 'A beginner’s guide to real estate investing.',
            image: ArticleImage3,
            date: '25 Apr 2022',
            category: 'Plutus News',
            user: {
                name: 'Naveed Shabbir',
                avatar: authorProfileIcon
            }
        },
        {
            title: 'Intro into Crypto Currency.',
            image: ArticleImage4,
            date: '25 Apr 2022',
            category: 'Plutus News',
            user: {
                name: 'Naveed Shabbir',
                avatar: authorProfileIcon
            }
        },
        {
            title: 'Cryptocurrency & Real Estate',
            image: ArticleImage5,
            date: '25 Apr 2022',
            category: 'Plutus News',
            user: {
                name: 'Naveed Shabbir',
                avatar: authorProfileIcon
            }
        },
        {
            title: 'Benefits on real estate investing',
            image: ArticleImage6,
            date: '25 Apr 2022',
            category: 'Plutus News',
            user: {
                name: 'Naveed Shabbir',
                avatar: authorProfileIcon
            }
        },
    ]

    return (
        <>
            <Navbar footerRef={footerRef} />

            <header className="jumbotron blog-header text-center">
                <div className="container">
                    <p>1% OF THE INDUSTRY</p>
                    <h1>Hype got you here.<br /> Stay for the support.</h1>
                </div>
            </header>

            <main role="main">
                <div className="album py-5 bg-light">
                    <div className="container">

                        <h3 className="text-center m-5">Latest Blog Posts</h3>

                        <div className="row articles-list">
                            {articlesList.map((i) => (
                                <div className="col-md-4">
                                    <div className="card mb-4 shadow-sm article">
                                        <img src={i.image} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="author-info">
                                                    <img src={i.user.avatar} className="author-icon" alt="Author Icon" />
                                                    <span className="author-name">{i.user.name}</span>
                                                </div>
                                                <small className="text-muted">{i.date}</small>
                                            </div>
                                            <h5 className="card-title">{i.title}</h5>
                                            <a href="#" className="card-link">
                                                Learn more <img src={IconArrowRight} alt="Arrow Icon" className="arrow-icon" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer ref={footerRef} />
        </>
    );
}
