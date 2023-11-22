import Image from "next/image";

export const clients = [
    "/client-2.svg",
    "/client-3.svg",
    "/client-4.svg",
    "/client-5.svg",
    "/client-6.svg",
];


export function Partners(){
    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-6 p-4">
        <h3 className="text-center text-lg font-medium">Join over 2,000,000 teams worldwide that are using Coll8er to get more done.</h3>
        <div className="grid grid-cols-3  mt-12 gap-4 md:grid-cols-6">
            {
                clients.map((clientImg, idx) => 
                <div key={idx} className="relative select-none h-14 md:w-64 sm:w-32 w-24">
                  <Image src={clientImg} alt="client" fill className="object-contain" />
            </div>
                )
            }
                
        </div>
        </div>
    )
}