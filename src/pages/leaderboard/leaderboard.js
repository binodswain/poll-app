import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "../../features/user/authSlice";
import { getQuestionsAsync } from "../../features/dashboard/dashboardSlice";
import LeaderboardTable from "../../features/user/Leaderboard";

export default function Leaderboard() {
    const dispatch = useDispatch();

    const allusers = useSelector((state) => state.auth.allusers);
    const allQuestions = useSelector((state) => state.dashboard.questions);

    useEffect(() => {
        if (!allusers) {
            dispatch(getUsersAsync());
        }
        if (!allQuestions) {
            dispatch(getQuestionsAsync());
        }
    }, [allusers, allQuestions, dispatch]);

    return (
        <>
            <LeaderboardTable />
        </>
    );
}
