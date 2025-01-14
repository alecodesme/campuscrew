import Footer from "@/components/app/footer/footer";
import Navbar from "@/components/app/navbar/navbar";
import React from "react";

const CommunityPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            {/* Header Section */}
            <div className="text-center py-10">
                <p className="text-sm text-gray-600 uppercase tracking-wide">We value</p>
                <h1 className="text-5xl font-extrabold text-gray-900">Community</h1>
            </div>

            {/* Subheader */}
            <p className="text-center text-gray-600 mb-10">
                Use the hashtag <span className="font-bold text-black">#ffm</span> to be featured!
            </p>

            {/* Gallery Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://www.tompkinscortland.edu/sites/default/files/images/Students-researching-benefits-of-community-college.png"
                        alt="Community 1"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://you.ubc.ca/wp-content/uploads/2013/06/community-orientation.jpg"
                        alt="Community 2"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/10/20210921_CL_DJA_046.jpg?itok=LWcTB0YR"
                        alt="Community 3"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://www.tompkinscortland.edu/sites/default/files/images/Students-researching-benefits-of-community-college.png"
                        alt="Community 1"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://you.ubc.ca/wp-content/uploads/2013/06/community-orientation.jpg"
                        alt="Community 2"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/10/20210921_CL_DJA_046.jpg?itok=LWcTB0YR"
                        alt="Community 3"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://www.tompkinscortland.edu/sites/default/files/images/Students-researching-benefits-of-community-college.png"
                        alt="Community 1"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://you.ubc.ca/wp-content/uploads/2013/06/community-orientation.jpg"
                        alt="Community 2"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/10/20210921_CL_DJA_046.jpg?itok=LWcTB0YR"
                        alt="Community 3"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://www.tompkinscortland.edu/sites/default/files/images/Students-researching-benefits-of-community-college.png"
                        alt="Community 1"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://you.ubc.ca/wp-content/uploads/2013/06/community-orientation.jpg"
                        alt="Community 2"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                        src="https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/10/20210921_CL_DJA_046.jpg?itok=LWcTB0YR"
                        alt="Community 3"
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default CommunityPage;
