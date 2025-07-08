import TextDecor from "../components/TextDecor";
import RegisterComponent from "../features/register/Register";
const Register = () => {
  return (
    <div className="registerPage">
      <div className="registerPage__box">
        <div className="registerPage__left">
          <header className="header">
            <a href="/">
              <p>S.T.E.P.</p>
            </a>
          </header>
          <main className="main">
          <RegisterComponent />
          </main>
        </div>
        <div className="registerPage__right">
          <TextDecor />
        </div>
      </div>
    </div>
  );
};

export default Register;
