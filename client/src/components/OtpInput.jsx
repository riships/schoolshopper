import React, { useRef, useState } from 'react'

function OtpInput({ otplength = 6, onOtpChange }) {
    const [otp, setOtp] = useState(new Array(otplength).fill(""));// default otp value is empty
    const inputRefs = useRef([]);

    const handleChange = (index, e) => {
        const val = e.target.value;
        if (!/^\d$/.test(val)) return;

        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);

        if (val && index < otplength - 1) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.every(num => num != '')) {
            onOtpChange(newOtp.join(''));
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];

            if (newOtp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };


    return (
        <div className='d-flex gap-2'>
            {
                otp.map((item, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={item}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="form-control text-center"
                    />
                ))
            }
        </div>
    )
}

export default OtpInput