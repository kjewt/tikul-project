import { Link } from 'react-router-dom';
import DropDown from '../components/common/Dropdown';

const Join = (): JSX.Element => {
    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <Link to="/">
                            <h1 className="text-5xl font-bold">Tikul</h1>
                        </Link>
                        <p className="py-3 mt-8">회원가입</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">이메일</span>
                                </label>
                                <input type="text" placeholder="이메일" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">비밀번호</span>
                                </label>
                                <input type="text" placeholder="비밀번호 입력" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">비밀번호 확인</span>
                                </label>
                                <input type="text" placeholder="비밀번호 재입력" className="input input-bordered" />
                            </div>

                            {/* 나누기 */}
                            <div className="flex items-center justify-around">
                                <hr className="w-full mt-6"></hr>
                            </div>
                            {/* 계좌 입력 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">계좌 등록</span>
                                </label>
                                <input type="text" placeholder="" className="input input-bordered" />
                            </div>
                            {/* 은행선택 드롭다운 */}
                            <DropDown />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">계좌 비밀번호</span>
                                </label>
                                <input type="text" placeholder="(6자리)" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">계좌 비밀번호 확인</span>
                                </label>
                                <input type="text" placeholder="" className="input input-bordered" />
                            </div>
                            <div className="flex items-center justify-around">
                                <hr className="w-full mt-6"></hr>
                            </div>
                            {/*약관 동의*/}
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-primary" />
                                    <span className="label-text">만 14세 이상입니다.</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-primary" />
                                    <span className="label-text">서비스 정책에 동의합니다.</span>
                                </label>
                            </div>
                            {/* 회원가입하기 버튼*/}
                            <div className="form-control my-6">
                                <button className="btn btn-primary">회원가입하기</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Join;
