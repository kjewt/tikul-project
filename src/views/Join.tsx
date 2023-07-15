import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import DropDown from '../components/common/Dropdown';
import EmailCheck from '../components/check/EmailCheck';

const Join = (): JSX.Element => {



    const handleRegister = async () => {
        try {
            // Get the input values for email and password
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const passwordInput = document.getElementById('password') as HTMLInputElement;
            const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailError = document.getElementById('emailError') as HTMLSpanElement;
            if (!emailRegex.test(emailInput.value)) {
                emailError.classList.remove("hidden");
                return;
            } else {
                emailError.classList.add("hidden");
            }


            // Check if email already exists in the database
            // You can add your own logic here to check against existing user data

            // Validate the password
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
            if (!passwordRegex.test(passwordInput.value)) {
                console.log('Invalid password format');
                return;
            }

            // Check if the password and confirm password match
            if (passwordInput.value !== confirmPasswordInput.value) {
                console.log('Passwords do not match');
                return;
            }

            // Proceed with user registration
            const email = emailInput.value;
            const password = passwordInput.value;

            // Your code to register the user with Firebase using `createUserWithEmailAndPassword`

            // Handle successful registration

        } catch (error) {
            // Handle registration errors
            console.log(error);
        }
    };

    const db = firebase.firestore();
    console.log(db)

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
                            <EmailCheck />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">비밀번호</span>
                                    <span className="password-error text-sm text-primary hidden">대문자, 소문자, 숫자 포함 8~16자 이내</span>
                                </label>
                                <input type="text" placeholder="비밀번호 입력" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">비밀번호 확인</span>
                                    <span className="password-confirm-error text-sm text-primary hidden">비밀번호가 일치하지 않습니다.</span>
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
                                <button className="btn btn-primary" onClick={handleRegister}>
                                    회원가입하기
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Join;
