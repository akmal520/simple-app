import React from "react";

const UserAvatar = ({ username = "guest", size = 100 }) => {
    // Memastikan username adalah string dan tidak null/undefined
    const safeUsername = (username || "guest").toString();

    // Fungsi untuk menghasilkan warna berdasarkan string
    const stringToColor = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash % 360);
        return `hsl(${hue}, 70%, 80%)`;
    };

    // Menghasilkan nilai-nilai unik berdasarkan username
    const seed = safeUsername.toLowerCase();
    const backgroundColor = stringToColor(seed);
    const hairColor = stringToColor(seed + "hair");
    const skinColor = stringToColor(seed + "skin");

    // Menghasilkan karakteristik wajah berdasarkan username
    const eyeSpacing = 20 + (seed.charCodeAt(0) % 10);
    const mouthWidth = 30 + (seed.charCodeAt(1) % 20);
    const hairStyle = seed.length % 3; // 0, 1, atau 2 untuk gaya rambut berbeda
    console.log(hairColor);

    return (
        <div className={`relative inline-block`} style={{ borderRadius: "50%", borderColor: skinColor, borderWidth: "2px", borderStyle: "solid" }}>
            <svg
                viewBox="0 0 200 200"
                width={size}
                height={size}
                className="rounded-full"
            >
                {/* Background */}
                <circle cx="100" cy="100" r="90" fill={backgroundColor} />

                {/* Kepala */}
                <circle cx="100" cy="85" r="40" fill={skinColor} />

                {/* Mata */}
                <circle cx={100 - eyeSpacing} cy="75" r="5" fill="#333" />
                <circle cx={100 + eyeSpacing} cy="75" r="5" fill="#333" />

                {/* Mulut */}
                <path
                    d={`M${100 - mouthWidth},100 Q100,120 ${
                        100 + mouthWidth
                    },100`}
                    stroke="#333"
                    strokeWidth="3"
                    fill="none"
                />

                {/* Rambut - 3 gaya berbeda */}
                {hairStyle === 0 && (
                    <path
                        d={`M60,85 Q100,25 140,85`}
                        stroke={hairColor}
                        strokeWidth="8"
                        fill="none"
                    />
                )}
                {hairStyle === 1 && (
                    <path
                        d={`M60,85 L100,30 L140,85`}
                        stroke={hairColor}
                        strokeWidth="8"
                        fill="none"
                    />
                )}
                {hairStyle === 2 && (
                    <>
                        <path
                            d={`M70,85 Q100,40 130,85`}
                            stroke={hairColor}
                            strokeWidth="12"
                            fill="none"
                        />
                        <path
                            d={`M60,85 Q100,35 140,85`}
                            stroke={hairColor}
                            strokeWidth="8"
                            fill="none"
                        />
                    </>
                )}
            </svg>
        </div>
    );
};

export default UserAvatar;
