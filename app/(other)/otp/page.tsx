import InputOTPDemo from '@/components/otp/InputOTPDemo';

import React from 'react';

const Page = () => {
    return (
        <div className="max-screen-2xl mx-auto p-4 justify-center flex flex-col  items-center h-screen">
            
            <p className="text-center mt-4">Entrez le OTP.</p>
            {/* Add your OTP input form or component here */}
             <InputOTPDemo/>
        </div>
    );
}

export default Page;
