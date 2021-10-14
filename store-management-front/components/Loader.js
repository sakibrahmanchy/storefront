import LoaderStyles from '../styles/Loader.module.css';
const Loader = () => (
  <div className="d-flex justify-content-center p-2">
    <div className={LoaderStyles.loader}></div>
  </div>
);
export default Loader;
