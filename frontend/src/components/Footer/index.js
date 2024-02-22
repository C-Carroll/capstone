import "./foot.css"
const Foot = () => {
    return(

        <div className='foot'>

                <div className='createByLink'>
                    Created By
                    <a className="newPage" id="gitHub" href="https://github.com/C-Carroll" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-square-github"></i></a>
                    <a className="newPage" id="linkdin" href="https://linkedin.com/in/charlescarrollswe" target="_blank" rel="noreferrer"><i class="fa-brands fa-linkedin"></i></a>
                    <a className="newPage" id="portfolio" href="https://c-carroll.github.io/" target='_blank' rel="noopener noreferrer"><i class="fa-solid fa-face-smile-beam"></i></a>
                </div>
        </div>
    )
}
export default Foot
