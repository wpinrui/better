import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import {
    PATH_LOGIN,
    PATH_DASHBOARD,
    PATH_REGISTER,
    PATH_RESET,
} from "../Paths.js";

const useRedirect = (loadingCondition, redirectCondition, destination) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (loadingCondition) {
            return;
        }
        if (redirectCondition) {
            navigate(destination);
        }
    }, [redirectCondition, loadingCondition, navigate, destination]);
};

export const useAuthenticatedRedirect = () => {
    const [user, loading, error] = useAuthState(auth);
    useRedirect(loading, user, PATH_DASHBOARD);
};

export const useUnauthenticatedRedirect = () => {
    const [user, loading, error] = useAuthState(auth);
    useRedirect(loading, !user, PATH_LOGIN);
};
