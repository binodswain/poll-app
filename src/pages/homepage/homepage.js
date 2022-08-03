import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HomePageWidget } from "../../features/dashboard/Dashboard";
import { getQuestionsAsync } from "../../features/dashboard/dashboardSlice";

export default function Homepage() {
    // fetch questions for logged in user
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestionsAsync());
    }, []);

    return (
        <>
            <HomePageWidget />
        </>
    );
}
