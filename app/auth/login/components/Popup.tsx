import React from 'react';

interface PopupProps {
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-8 rounded-lg">
                <button className="absolute top-2 left-2 text-gray-600 text-2xl hover:text-gray-800 mx-2" onClick={onClose}>
                    x
                </button>
                <h2 className="text-xl font-bold font-inter mb-4 my-5">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex">
                        <div className="mr-2 w-1/2">
                            <label htmlFor="firstName" className="block text-sm font-semibold mb-1">First Name</label>
                            <input type="text" id="firstName" name="firstName" className="w-full border border-gradient rounded-md px-3 py-2" required />
                        </div>
                        <div className="ml-2 w-1/2">
                            <label htmlFor="lastName" className="block text-sm font-semibold mb-1">Last Name</label>
                            <input type="text" id="lastName" name="lastName" className="w-full border border-gradient rounded-md px-3 py-2" required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                        <input type="email" id="email" name="email" className="w-full border border-gradient rounded-md px-3 py-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
                        <input type="password" id="password" name="password" className="w-full border border-gradient rounded-md px-3 py-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="verifyPassword" className="block text-sm font-semibold mb-1">Verify Password</label>
                        <input type="password" id="verifyPassword" name="verifyPassword" className="w-full border border-gradient rounded-md px-3 py-2" required />
                    </div>
                    <button type="submit" className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full px-4 py-2">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default Popup;
