import { Fragment } from "react";
import ChangePin from "./ChangePin";
import ChangePassword from "./ChangePassword";
import { useNavigate } from "react-router-dom";

const Security = () => {
    const navigate = useNavigate();
    return (
        <Fragment>
            <div className="switch">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="panel space-y-5">
                        <h5 className="font-semibold text-lg mb-4">Account Password</h5>
                        <p>
                            Your account password secures your account and will prompt a confirmation email when changed. 
                            Keep it strong and check your email for any updates.
                        </p>
                        <button className="btn btn-secondary" onClick={() => navigate('/app/settings/security/change-password')}>Change Password</button>
                    </div>
                    <div className="panel space-y-5">
                        <h5 className="font-semibold text-lg mb-4">Account PIN</h5>
                        <p>
                            Your account PIN is a secure 4-digit code required to authorize transactions on your account. 
                            Ensure it is unique and not easily guessed to protect your financial information.
                        </p>
                        <button className="btn btn-secondary" onClick={() => navigate('/app/settings/security/change-pin')}>Change PIN</button>
                    </div>
                    <div className="panel space-y-5">
                        <h5 className="font-semibold text-lg mb-4">Two-Factor Authentication (2FA)</h5>
                        <p>
                            Two-Factor Authentication (2FA) adds security by requiring a 6-digit code with your password. 
                            This helps protect your account from unauthorized access.
                        </p>
                        <label className="w-12 h-6 relative">
                            <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox7" />
                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                        </label>
                    </div>
                </div>
            </div>
            <ChangePassword />
            <ChangePin />
        </Fragment>
    );
};

export default Security;