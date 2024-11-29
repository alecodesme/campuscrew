import Image from 'next/image';

const UniversityRow = () => {
    const universities = [
        {
            name: "Lund University",
            image: "https://menlocoaching.com/app/uploads/2022/01/1591px-NYU07-1024x771.jpeg",
        },
        {
            name: "Chalmers University of Technology",
            image: "https://menlocoaching.com/app/uploads/2022/01/1591px-NYU07-1024x771.jpeg",
        },
        {
            name: "KTH Royal Institute of Technology",
            image: "https://menlocoaching.com/app/uploads/2022/01/1591px-NYU07-1024x771.jpeg",
        },
        {
            name: "Stockholm University",
            image: "https://menlocoaching.com/app/uploads/2022/01/1591px-NYU07-1024x771.jpeg",
        },
        {
            name: "Stockholm University",
            image: "https://menlocoaching.com/app/uploads/2022/01/1591px-NYU07-1024x771.jpeg",
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-4">
            <div className='py-5'>
                <h2 className="text-2xl font-bold text-blue-500">
                    Universities that partner with us
                </h2>
                <p className='text-gray-400'>
                    Our partnerships with universities and other networks open up global opportunities for students and staff.
                </p>
            </div>
            <div
                className={`flex flex-col gap-6 md:flex-row`}

            >
                {universities.map((university, index) => (
                    <div
                        key={index}
                        className="relative h-[250px] md:h-[500px] w-full md:w-1/5 hover:w-full duration-300 overflow-hidden rounded-lg shadow-lg bg-white"
                    >
                        <img
                            src={university.image}
                            alt={university.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-lg font-semibold group-hover:bg-opacity-70 transition">
                            {`${index + 1}. ${university.name}`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UniversityRow;