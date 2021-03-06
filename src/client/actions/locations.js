/*!
 * kin
 * Copyright(c) 2016-2017 Benoit Person
 * Apache 2.0 Licensed
 */

import "whatwg-fetch";
import _ from "lodash";

import {
    api_url,
    fetch_check,
    fetch_check_simple_status,
    fetch_check_advanced_status,
    fetch_options
} from "../utils";

/**
 * Others Action creators
 */
export const add_locations = locations => {
    return {
        type: "ADD_LOCATIONS",
        locations
    };
};

/**
 * Async actions creators
 */
export const async_load_locations = () => {
    return (dispatch) => {
        return fetch(api_url("/dispatches/locations"), fetch_options())
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(json_res => {
                dispatch(add_locations(json_res));
            });
    };
};

export const async_add_location = location_name => {
    return (dispatch) => {
        return fetch(
            api_url("/dispatches/location/add"), 
            fetch_options({
                method: "POST",
                body: location_name
            }))
            .then(fetch_check)
            .catch(fetch_check_simple_status)
            .catch(_.partial(fetch_check_advanced_status, dispatch))
            .then(json_res => {
                console.log("response from server", json_res);
                const location = { id: json_res.insertId, name: location_name };
                console.log("adding location", location);
                dispatch(add_locations([location]));
            });
    };
};
