import { Link } from 'react-router-dom'
import EmailCheck from '../components/check/EmailCheck';
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
              <EmailCheck />
              <div className="form-control">
                <label className="label">
                  <span className="label-text">비밀번호</span>
                </label>
                <input type="text" placeholder="비밀번호를 입력" className="input input-bordered" />
              </div>
              <div className="form-control my-6">
                <button className="btn btn-primary">Login</button>
                <label className="label justify-center mt-2">
                  <span className="text-sm mr-2">아직 회원이 아니라면 지금 바로</span>
                  <Link to="join" className="link-hover text-sm text-primary">가입하세요</Link>
                </label>
              </div>
              {/* 나누기 */}
              <div className="flex items-center justify-around">
                <hr className="w-1/3"></hr>
                <span>or</span>
                <hr className="w-1/3"></hr>
              </div>
              {/* 구글소셜로그인 */}
              <div className="form-control mt-6">
                <button className="btn btn-outline btn-primary">
                  <div className="flex items-center">
                    <i className="bx bxl-google text-2xl"></i>
                    <span>구글 아이디로 로그인</span>
                  </div>
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
