import '../assets/css/Hero.css'

export default function Hero() {
    return (
        <section className="hero-section">
            <nav>
                <p>SCN835</p>
                <span>
                    <a href="#about">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </span>
            </nav>
            <div className="hero-content">
                <h1>THIS IS <br/> SHIV CHAUHAN .</h1>
                <p>Hey there! Glad you stopped by — feel free to explore and get to know a little more about me.</p>
            </div>
        </section>
    )
}