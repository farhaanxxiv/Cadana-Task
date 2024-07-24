import { useEffect, useState } from "react"

export default function Kitchen() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders()
    }, [])

    async function fetchOrders() {
        try {

            const response = await fetch("http://127.0.0.1:5000/fetch_orders");
            const order = await response.json();
            setOrders(order)
            console.log(order)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <section>
            {
                orders.length != 0 ?
                    <>
                        <h2 className="text-5xl text-center font-bold">All Orders</h2>
                        <div className="grid grid-cols-2 gap-4 mt-12">
                            {orders.map((order) => {
                                return (
                                    <div className="flex flex-col gap-y-1 bg-[#202020] w-full p-5 rounded-2xl">

                                        <p>Time : {order.time}</p>
                                        <p>Sushi A : {order.sushia}</p>
                                        <p>Sushi B : {order.sushib}</p>
                                        <p>Total Price : {order.price}£</p>
                                        <p>Price After Discount: {order.discountedprice}£</p>

                                    </div>
                                )
                            })}
                        </div>
                    </>
                    :
                    <p>No Orders</p>
            }
        </section>
    )
}