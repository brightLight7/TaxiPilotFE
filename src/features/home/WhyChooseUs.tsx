export default function WhyChooseUs() {
  const features = [
    { icon: 'fa-clock', title: '24/7 Availability', desc: 'No matter when you need a ride, our services are available around the clock.' },
    { icon: 'fa-user-shield', title: 'Professional Drivers', desc: 'All our drivers are fully licensed, experienced, and committed to your safety and comfort.' },
    { icon: 'fa-car', title: 'Modern Fleet', desc: 'Our fleet of vehicles is regularly maintained, ensuring reliability and comfort during every ride.' },
    { icon: 'fa-mobile-alt', title: 'Flexible Booking', desc: 'Book your ride easily through our online platform, mobile app, or by phone.' },
    { icon: 'fa-envelope', title: 'Customer Support', desc: 'Our dedicated support team is always available to assist with your queries or special requests.' },
  ];

  return (
    <div className="anim why-choose-us-section">
      <h2>Why Choose TaxiPilot?</h2>
      <p>At TaxiPilot, we go the extra mile to ensure our passengers enjoy a comfortable and safe journey. Here's why we stand out:</p>
      <ul>
        {features.map((f) => (
          <li key={f.title}>
            <i className={`fa ${f.icon}`} aria-hidden="true" />
            <div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
