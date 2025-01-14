import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 px-6 mt-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Universities</h3>
                    <ul>
                        <li><a href="#" className="hover:text-gray-400">University Programs</a></li>
                        <li><a href="#" className="hover:text-gray-400">Scholarships & Financial Aid</a></li>
                        <li><a href="#" className="hover:text-gray-400">Academic Research</a></li>
                        <li><a href="#" className="hover:text-gray-400">Admissions & Requirements</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">University Clubs</h3>
                    <ul>
                        <li><a href="#" className="hover:text-gray-400">Sports Clubs</a></li>
                        <li><a href="#" className="hover:text-gray-400">Cultural Activities</a></li>
                        <li><a href="#" className="hover:text-gray-400">Academic Clubs</a></li>
                        <li><a href="#" className="hover:text-gray-400">University Volunteering</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Connect</h3>
                    <ul>
                        <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
                        <li><a href="#" className="hover:text-gray-400">Social Media</a></li>
                        <li><a href="#" className="hover:text-gray-400">Support & Help</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
                <p>&copy; 2024 All Rights Reserved. Campus Crew</p>
            </div>
        </footer>
    );
};

export default Footer;
