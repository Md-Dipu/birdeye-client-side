import React, { useEffect, useMemo, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getPlanById } from '../../../api/plansAPI';
import Loading from '../../Shared/Loading/Loading';
import GeneralDetails from './GeneralDetails';
import PlanBookings from './PlanBookings';

const PlanDetails = () => {
    const [plan, setPlan] = useState({});
    const [updated, setUpdated] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { planId } = useParams();
    const history = useHistory();
    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);

    const handleDetailsLinks = () => history.replace('?');

    const handleBookingLinks = (filter) => () => {
        query.set('show', 'bookings');
        filter ? query.set('filter', filter) : query.delete('filter');
        history.replace(`?${query.toString()}`);
    };

    const handleReviewsLinks = () => {
        query.delete('filter');
        query.set('show', 'reviews');
        history.replace(`?${query.toString()}`);
    };

    useEffect(() => {
        setIsLoading(true);
        getPlanById(planId)
            .then(res => setPlan(res.data.data.value))
            .catch(console.warn)
            .finally(() => setIsLoading(false));
    }, [planId, updated]);

    const showRoute = () => {
        switch (query.get('show')) {
            case 'bookings':
                return <PlanBookings
                    planId={planId}
                    filter={query.get('filter')}
                />;

            default:
                return (
                    isLoading ? <Loading height="60" /> :
                        <>
                            <GeneralDetails onUpdate={() => setUpdated(updated + 1)} {...plan} />
                        </>
                );
        }
    };

    return (
        <Container>
            <Row>
                <Col md="3">
                    <ListGroup variant="flush">
                        <ListGroup.Item action onClick={handleDetailsLinks}>Plan details</ListGroup.Item>
                        <ListGroup.Item action onClick={handleBookingLinks()}>Bookings</ListGroup.Item>
                        <ListGroup.Item action onClick={handleBookingLinks('cancelation')}>Cancel requests</ListGroup.Item>
                        <ListGroup.Item action onClick={handleBookingLinks('canceled')}>Canceled</ListGroup.Item>
                        <ListGroup.Item action onClick={handleBookingLinks('paid')}>Paid</ListGroup.Item>
                        <ListGroup.Item action onClick={handleReviewsLinks}>Reviews</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    {showRoute()}
                </Col>
            </Row>
        </Container>
    );
};

export default PlanDetails;