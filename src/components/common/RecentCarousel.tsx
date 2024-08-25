import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewPostCard from './NewPostCard';
import '../../styles/common/RecentCarousel.scss'

// const CustomArrow = ({ className, style, onClick, direction }: any) => (
//   <div
//     className={className}
//     style={{ display: "block", background: "rgba(97, 100, 107, 0.3)", border: "1px dotted red", borderRadius: "0.5rem" }}
//     onClick={onClick}
//   >
//     {direction === 'next' ? '>' : '<'}
//   </div>
// );

const RecentCarousel = ({ items = [] }: any) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,        
    autoplaySpeed: 3000,
    // nextArrow: <CustomArrow direction="next" />,
    // prevArrow: <CustomArrow direction="prev" />
  };

  return (
    <div className="carousel-container">
      <div className="title">새로운 소식 💫</div>
      <Slider {...settings}>
        {items.map((item: any, index: number) => (
          <div key={index} className="carousel-card">
            <NewPostCard item={item}/>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default RecentCarousel;