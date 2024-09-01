import { FC } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Star } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";

const Testimonial: FC = () => {
    const reviews = [
        {
            rating: 4.9,
            image: "https://pagedone.io/asset/uploads/1696229969.png",
            review: "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.",
            name: "Jane D",
            ocupation: "Product Designer",
        },
        {
            rating: 5,
            image: "https://pagedone.io/asset/uploads/1696229994.png",
            review: "Thanks to pagedone, I feel more informed and confident about my investment decisions than ever before.",
            name: "Harsh P.",
            ocupation: "CEO",
        },
        {
            rating: 3.9,
            image: "https://pagedone.io/asset/uploads/1696229969.png",
            review: "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.",
            name: "Harsh P.",
            ocupation: "CEO",
        },
        {
            rating: 4.5,
            image: "https://pagedone.io/asset/uploads/1696229969.png",
            review: "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.",
            name: "Harsh P.",
            ocupation: "CEO",
        },
    ];
    return (
        <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center gap-2 mb-8 md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Testimonial
                    </h2>
                    <p className="text-muted-foreground">
                        What Clients Say about Us!
                    </p>
                </div>
                {/*Slider wrapper*/}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={32}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 32,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 32,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 32,
                        },
                    }}
                    pagination={{
                        el: ".swiper-pagination",
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    {reviews.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="group bg-background border rounded-xl p-6 transition-all duration-500  w-full mx-auto slide_active:border-primary hover:border-primary hover:shadow-sm">
                                <div className="">
                                    <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500  ">
                                        <Star className="size-5" />

                                        <span className="text-base font-semibold text-primary">
                                            {item.rating}
                                        </span>
                                    </div>
                                    <p className="text-base text-gray-600 dark:text-gray-300 leading-6  transition-all duration-500 pb-8 group-hover:text-gray-800 slide_active:text-gray-800">
                                        {item.review}
                                    </p>
                                </div>
                                <div className="flex items-center gap-5 border-t pt-5">
                                    <img
                                        className="rounded-full h-10 w-10"
                                        src="https://pagedone.io/asset/uploads/1696229969.png"
                                        alt="avatar"
                                    />
                                    <div className="block">
                                        <h5 className="text-gray-900 dark:text-gray-200 font-medium transition-all duration-500  mb-1">
                                            {item.name}
                                        </h5>
                                        <span className="text-sm leading-4 text-gray-500 dark:text-gray-300">
                                            {item.ocupation}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="swiper-pagination mt-5"></div>
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonial;
