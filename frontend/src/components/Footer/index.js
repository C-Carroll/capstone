import "./foot.css";
const Foot = () => {
  return (
    <div>
      <svg
        className="pxpx"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ff8fb1"
          fill-opacity="1"
          d="M0,128L21.8,138.7C43.6,149,87,171,131,165.3C174.5,160,218,128,262,101.3C305.5,75,349,53,393,53.3C436.4,53,480,75,524,101.3C567.3,128,611,160,655,154.7C698.2,149,742,107,785,122.7C829.1,139,873,213,916,234.7C960,256,1004,224,1047,197.3C1090.9,171,1135,149,1178,165.3C1221.8,181,1265,235,1309,224C1352.7,213,1396,139,1418,101.3L1440,64L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
        ></path>
      </svg>
      <div className="foot">
        <div className="createByLink">
          Created By
          <a
            className="newPage"
            id="gitHub"
            href="https://github.com/C-Carroll"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-square-github"></i>
          </a>
          <a
            className="newPage"
            id="linkdin"
            href="https://linkedin.com/in/charlescarrollswe"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a
            className="newPage"
            id="portfolio"
            href="https://c-carroll.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-solid fa-face-smile-beam"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Foot;
