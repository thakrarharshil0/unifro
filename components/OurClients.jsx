import { useEffect, useState } from 'react';

const OurClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
        const fetchUrl = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
        const res = await fetch(`${fetchUrl}/client-images`);
        const result = await res.json();
        if (result.success) {
          setClients(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };
    fetchClients();
  }, []);

  // Split into two rows
  const middleIndex = Math.ceil(clients.length / 2);
  const row1Logos = clients.slice(0, middleIndex);
  const row2Logos = clients.slice(middleIndex);

  // Duplicate for seamless loop
  const doubledRow1 = [...row1Logos, ...row1Logos];
  const doubledRow2 = [...row2Logos, ...row2Logos];

  return (
    <section className="relative w-full bg-white pt-16 sm:pt-20 pb-0 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-10 lg:px-[60px] min-[2500px]:max-w-[2200px] min-[2500px]:px-40">

        <h2 className="text-[#1a2a5e] font-anton font-black text-center mb-16 relative z-10 text-[clamp(2.5rem,7vw,5rem)] pt-4 min-[2500px]:text-[8rem] min-[2500px]:mt-20">
          OUR CLIENTS
        </h2>
        {/* Title */}


        <div className="absolute inset-0 hidden xl:flex justify-center font-['Impact'] text-[120px] text-black/5 uppercase pointer-events-none min-[2500px]:text-[200px]">
          OUR CLIENTS
        </div>

        {/* Slider with Fade */}
        <div
          className="
            relative w-full overflow-hidden
            [mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)] sm:[mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]
            [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)] sm:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]
          "
        >
          {/* ROW 1 – Left to Right */}
          <div className="overflow-hidden py-3 sm:py-[30px]">
            <div className="clients-track track-ltr flex gap-6 sm:gap-8 md:gap-[40px] w-fit min-[2500px]:gap-16">
              {doubledRow1.map((logo, index) => (
                <div
                  key={`r1-${index}`}
                  className="
                    shrink-0
                    w-[90px] h-[55px] min-[400px]:w-[120px] min-[400px]:h-[70px]
                    sm:w-[140px] sm:h-[80px]
                    md:w-[160px] md:h-[90px]
                    lg:w-[180px] lg:h-[100px]
                    min-[2500px]:w-[250px] min-[2500px]:h-[140px]
                    min-[2500px]:rounded-[20px]

                    flex items-center justify-center
                    rounded-[10px]
                    p-2 sm:p-3
                    bg-white
                    shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                    transition-all duration-300
                    hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]
                    hover:scale-105
                  "
                >
                  <img
                    src={logo.image_url}
                    alt={`Client ${logo.id}`}
                    className="
                      w-[120%] h-[120%]
                      object-contain
                      transition-transform duration-300
                      hover:scale-105
                    "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2 – Right to Left */}
          <div className="
            overflow-hidden py-6 sm:py-[30px] pb-6
            ml-[-30px] min-[400px]:ml-[-60px] sm:ml-[-80px] md:ml-[-100px]
          ">
            <div className="clients-track track-rtl flex gap-6 sm:gap-8 md:gap-[40px] w-fit min-[2500px]:gap-16">
              {doubledRow2.map((logo, index) => (
                <div
                  key={`r2-${index}`}
                  className="
                    shrink-0
                    w-[90px] h-[55px] min-[400px]:w-[120px] min-[400px]:h-[70px]
                    sm:w-[140px] sm:h-[80px]
                    md:w-[160px] md:h-[90px]
                    lg:w-[180px] lg:h-[100px]
                    min-[2500px]:w-[250px] min-[2500px]:h-[140px]
                    min-[2500px]:rounded-[20px]

                    flex items-center justify-center
                    rounded-[10px]
                    p-2 sm:p-3
                    bg-white
                    shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                    transition-all duration-300
                    hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]
                    hover:scale-105
                  "
                >
                  <img
                    src={logo.image_url}
                    alt={`Client ${logo.id}`}
                    className="
                      w-[120%] h-[120%]
                      object-contain
                      transition-transform duration-300
                      hover:scale-105
                    "
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurClients;
