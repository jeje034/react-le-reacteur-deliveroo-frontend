import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Content from "./Content";
import Basket from "./Basket";

function App() {
    const [datas, setDatas] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        //
        //fonction à laisser dans le useEffect car on peut avoir des warnings si elle est en dehors
        //msgjs21 : l'indiquer dans doc
        const fetchDatas = async () => {
            const response = await axios.get(
                "https://le-reacteur-deliveroo.herokuapp.com/"
            );
            setDatas(response.data);
            setIsLoading(false);
        };
        fetchDatas();
    }, []);

    const updateBasket = (id, title, quantitytoAdd, price) => {
        const newBasket = [...basket];

        let mealFound = false;

        for (let i = 0; i < newBasket.length; i++) {
            if (newBasket[i].id === id) {
                mealFound = true;
                newBasket[i].quantity += quantitytoAdd;
                break;
            }
        }
        if (!mealFound) {
            newBasket.push({
                title: title,
                quantity: quantitytoAdd,
                price: price,
                id: id,
            });
        }
        setBasket(newBasket);
    };

    return isLoading ? (
        <span>En cours de chargement...</span>
    ) : (
        <>
            <Header datas={datas} />
            <div className="content-and-basket">
                <div>
                    <Content
                        datas={datas}
                        basket={basket}
                        setBasket={setBasket}
                        updateBasket={updateBasket}
                    />
                </div>
                <div>
                    <Basket
                        basket={basket}
                        setBasket={setBasket}
                        updateBasket={updateBasket}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
