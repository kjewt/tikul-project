import { Link } from 'react-router-dom'
import EmailCheck from '../components/auth/EmailCheck';
import Password from '../components/auth/Password';
import BtnLogin from '../components/auth/BtnLogin';
import BtnGoogleLogin from '../components/auth/BtnGoogleLogin';

const Login = (): JSX.Element => {
  return (
    <>
      <div className="container min-h-screen">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <Link to="/">
              <h1 className="text-5xl font-bold">Tikul</h1>
            </Link>
            <p className="py-3 mt-8">로그인</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form>
                <EmailCheck />
                <Password />
              </form>
              <BtnLogin />
              {/* 나누기 */}
              <div className="flex items-center justify-around">
                <hr className="w-1/3"></hr>
                <span>or</span>
                <hr className="w-1/3"></hr>
              </div>
              {/* 구글소셜로그인 */}
              <BtnGoogleLogin />



            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;