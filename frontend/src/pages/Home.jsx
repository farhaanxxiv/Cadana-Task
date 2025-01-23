import { MdAddCircleOutline } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { SushiCountContext } from "../providers/SushiCountProvider";
import Utils from "../utils/Utils";
import { Link } from "react-router-dom";

export default function Home() {
    const { decrementSushiB, decrementSushiA, incrementSushiA, incrementSushiB, sushiA, sushiB } = useContext(SushiCountContext);
    const [total, setTotal] = useState(0);
    const [price, setPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    function isLunchTime() {
        const now = new Date();
        const currentHour = now.getHours();
        return currentHour >= 11 && currentHour < 14;
    }

    function calculatePrice() {
        let pr = (sushiA * 3) + (sushiB * 4);
        setPrice(pr); // set initial price

        let newTotal = sushiA + sushiB;
        let discount = 0;

        //for 20+ and 10+ orders
        if (newTotal > 20) {
            discount = pr * 0.20;
        } else if (newTotal > 10) {
            discount = pr * 0.10;
        }
        //for lunch time discount
        if (isLunchTime()) {
            discount += pr * 0.20;
        }

        let finalDiscountedPrice = pr - discount;
        setDiscountedPrice(finalDiscountedPrice);
    }


    async function submitData() {

        const jsonBody = {
            sushiA: sushiA,
            sushiB: sushiB,
            price: price,
            discountedPrice: discountedPrice,
            orderid: Utils.uniqueID(),
            time: Utils.getCurrentFormattedTime()
        }

        try {

            const response = await fetch("http://127.0.0.1:5000/add_to_cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonBody)
            });
            alert('Sushi Has Been Ordered')
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        setTotal(sushiA + sushiB);
        calculatePrice();
    }, [sushiA, sushiB]);

    return (
        <section style={{ userSelect: 'none' }}>

            <Link className="w-fit ml-auto block" to='/susans-kitchen'>
                <button className="w-fit ml-auto block bg-white text-black p-4 py-1 rounded-xl mt-12 font-semibold">Susan's Kitchen</button>
            </Link>

            <h1 className="font-bold text-5xl text-center">Susan's Sushi Shop</h1>

            <div className="grid grid-cols-2 mt-24">
                <div>
                    <img className="w-[70%] rounded-3xl mx-auto block" src="/images/sushi-a.webp" alt="" />
                    <h3 className="font-semibold text-center mt-8 text-2xl">Sushi A</h3>
                    <p className="font-bold text-center text-xl my-auto mt-3">3£</p>

                    <div className="flex gap-x-4 justify-center mt-3 align-middle">
                        <FiMinusCircle onClick={() => decrementSushiA()} size={20} className="block my-auto" />
                        <p className="font-bold text-center text-xl my-auto">{sushiA}</p>
                        <MdAddCircleOutline onClick={() => incrementSushiA()} size={22} className="block my-auto" />
                    </div>
                </div>
                <div>
                    <img className="w-[70%] rounded-3xl mx-auto block" src="/images/sushi-b.webp" alt="" />
                    <h3 className="font-semibold text-center mt-8 text-2xl">Sushi B</h3>
                    <p className="font-bold text-center text-xl my-auto mt-3">4£</p>

                    <div className="flex gap-x-4 justify-center mt-3 align-middle">
                        <FiMinusCircle onClick={() => decrementSushiB()} size={20} className="block my-auto" />
                        <p className="font-bold text-center text-xl my-auto">{sushiB}</p>
                        <MdAddCircleOutline onClick={() => incrementSushiB()} size={22} className="block my-auto" />
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <p className="text-center font-semibold text-2xl">Cart</p>
                <div className="mt-4">
                    {total !== 0 ? (
                        <div>
                            <p>Total Quantity: {total}</p>
                            <p>Total Price: {price}£</p>
                            {total >= 10 && discountedPrice !== 0 && <p>Discounted Price: {discountedPrice}£</p>}
                        </div>
                    ) : (
                        <p>Add Sushi To View Your Total Price</p>
                    )}
                </div>

                <button onClick={() => { submitData() }} className="bg-white text-black p-4 py-1 rounded-xl mt-12 font-semibold">Buy Sushi's</button>
            </div>
        </section>
    );
}
