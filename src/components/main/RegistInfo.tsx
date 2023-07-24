import React from 'react'



const RegistInfo = (): JSX.Element => {

    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <p className="py-3">Banking</p>
                    </div>
                    <div className="card w-96 bg-accent shadow-xl">
                        <div className="mx-3 mt-3 rounded-xl bg-base-100">
                            <div className="user-account p-4 text-sm">
                                <span></span>
                                <span className="p-1"></span>
                                <span className="p-1"></span>
                            </div>
                            <div className="account-balance px-4 text-right text-xl"></div>
                            <div className="btn-banking p-4 flex justify-around gap-1">
                                <button className="btn btn-primary text-base-100 w-1/2">송금</button>
                                <button className="btn btn-outline btn-primary w-1/2 btn-hover">충전</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegistInfo
