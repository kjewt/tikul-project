import React from 'react'
import { Link } from 'react-router-dom'
const Summary = (): JSX.Element => {
    const today = new Date;
    const month = today.getMonth() + 1

    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <p className="py-3">{month}월 사용 내역</p>
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body text-md">
                            <div className="category">
                                <div className="edit flex gap-2 justify-end">
                                    <Link to="/detail">
                                        <button className="link link-primary pb-2 ">자세히보기</button>
                                    </Link>

                                </div>
                                <div className="category-content flex justify-between p-4">
                                    <span>카테고리 1</span>
                                    <span>총 720,300원</span>
                                </div>
                                <hr></hr>
                            </div>
                            <div className="category">
                                <div className="category-content flex justify-between p-4">
                                    <span>식비</span>
                                    <span>총 200,000원</span>
                                </div>
                                <hr></hr>
                            </div>
                            {/* 이번 달 총 사용 금액 */}
                            <div className="category">
                                <div className="border-2 border-primary category-content flex justify-between p-4">
                                    <span>이번달 총 지출</span>
                                    <span>총 920,300원</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Summary