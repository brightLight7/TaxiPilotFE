export default function OurService() {
  const services = [
    {
      img: '/assets/home-page/person-getting-into-taxi.jpg',
      items: [
        { label: 'Gatwick Pickup', desc: 'Arrive stress-free with our Gatwick Airport pickup. Our professional drivers greet you at the terminal and assist with luggage for a comfortable start to your journey.' },
        { label: 'Gatwick Drop-Off', desc: 'Reach Gatwick on time with our reliable drop-off service. Relax as we handle parking and luggage, ensuring a smooth arrival at your terminal.' },
        { label: 'Trusted Transfers', desc: 'Licensed, experienced drivers offer door-to-door Gatwick transfers, prioritizing safety and convenience for a seamless journey.' },
        { label: '24/7 Service', desc: 'Available anytime, our Gatwick Airport pickups and drop-offs provide smooth, efficient transfers with skilled drivers and reliable vehicles.' },
        { label: 'Personalized Transfers', desc: 'Book Gatwick Airport service tailored to your schedule, with options like meet-and-greet and real-time tracking for a hassle-free experience.' },
      ],
    },
    {
      img: '/assets/home-page/corporate-travel.jpg',
      items: [
        { label: 'Streamlined Business Travel', desc: 'Our corporate travel service offers efficiency, comfort, and professionalism. Ensuring punctuality and readiness, we cater to all your travel needs with a fleet of modern vehicles and experienced drivers, available 24/7.' },
        { label: 'Customizable Packages', desc: 'Tailored for your company, our packages include priority scheduling, real-time tracking, and flexible booking options. Focus on business goals while we handle seamless travel logistics.' },
        { label: 'Dedicated Account Management', desc: 'With a dedicated account manager, enjoy personalized service and transparent billing. We provide detailed reporting and proactive travel support, giving you peace of mind for every journey.' },
      ],
    },
    {
      img: '/assets/home-page/group-travel.jpg',
      items: [
        { label: 'Efficient Group Transportation', desc: 'Our group travel service ensures your group travels comfortably and arrives on time. With spacious vehicles and professional drivers, we cater to events, tours, and other group occasions.' },
        { label: 'Flexible Booking Options', desc: 'We offer customizable scheduling and multiple vehicle options to suit your group\'s size and needs. From small groups to large gatherings, our service is designed for convenience and flexibility.' },
        { label: 'Dedicated Support', desc: 'A dedicated coordinator manages your group\'s travel details, providing seamless planning, real-time updates, and support.' },
      ],
    },
    {
      img: '/assets/home-page/city-tour.jpg',
      items: [
        { label: 'Explore London During Your Stopover', desc: 'Make the most of your transit time with a quick London city tour, perfect for travelers with a 5-7 hour stopover at Gatwick Airport.' },
        { label: 'Tailored for Short Visits', desc: 'Our transit-friendly itinerary covers Buckingham Palace, the Tower of London, and Westminster Abbey. We ensure a smooth journey back to the airport with ample time for your next flight.' },
        { label: 'Seamless Pickup and Drop-Off', desc: 'Enjoy hassle-free pickup and drop-off from Gatwick Airport, with experienced drivers and knowledgeable guides.' },
      ],
    },
  ];

  return (
    <div className="anim services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((s, i) => (
          <div key={i} className="service-item">
            <img src={s.img} alt="" />
            <div className="p-desc">
              {s.items.map((item) => (
                <p key={item.label}>
                  <strong>{item.label}:</strong> {item.desc}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
