import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getPlanById } from '../../../api/plansAPI';
import Loading from '../../Shared/Loading/Loading';
import Banner from '../Banner/Banner';
import PlaceOrderForm from '../PlaceOrderForm/PlaceOrderForm';

const PlaceOrder = () => {
    const [data, setData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const { planId } = useParams();

    useEffect(() => {
        getPlanById(planId).then(res => {
            const data = res.data.data.value;
            data.payable = data.price - (data.price * ((data.globalDiscount || 0) / 100));
            return data;
        }).then(data => {
            setData(data);
        }).catch(error => console.warn(error.message))
            .finally(() => setLoading(false));
    }, [planId]);

    if (loading) {
        return <Loading height="60" />
    }

    return (
        <Container>
            <Banner handleShowForm={setShowForm} {...data} />
            {showForm && <PlaceOrderForm
                onClose={() => setShowForm(false)}
                {...data}
            />}
        </Container>
    );
};

export default PlaceOrder;